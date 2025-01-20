import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Options from "./options";
import Timer from "./timer";

const QuizPage = () => {
  // State variables
  const [questions, setQuestions] = useState([]); // Stores fetched questions
  const [options, setOptions] = useState([]); // Stores options for each question
  const [correctAns, setCorrectAns] = useState([]); // Stores correct answers
  const [userAns, setUserAns] = useState([]); // Stores user's selected answers
  const [index, setIndex] = useState(0); // Tracks the current question index
  const [visited, setVisited] = useState([]); // Tracks visited questions

  const location = useLocation();
  const navigate = useNavigate();

  // Validate email and fetch questions on component mount
  useEffect(() => {
    validateEmail();
  }, [location, navigate]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Redirect user to the start page if no email is found in state
  const validateEmail = () => {
    if (!location.state?.email) {
      navigate("/");
    }
  };

  // Fetches quiz questions from an external API
  const fetchQuestions = () => {
    fetch(`https://opentdb.com/api.php?amount=15`)
      .then((response) => response.json())
      .then((data) => initializeQuizData(data.results))
      .catch((error) => console.log(error));
  };

  // Initializes quiz data: questions, options, correct answers, and visited array
  const initializeQuizData = (results) => {
    const ans = results.map((item) => item.correct_answer); // Extract correct answers
    const userAnsArr = new Array(results.length).fill(""); // Initialize user answers
    const optionArr = results.map((item) => {
      const allOptions = [...item.incorrect_answers, item.correct_answer]; // Combine correct and incorrect answers
      return allOptions.sort(() => Math.random() - 0.5); // Shuffle options
    });
    const visitedArr = new Array(results.length).fill(false); // Initialize visited array
    visitedArr[0] = true; // Mark the first question as visited

    setQuestions(results);
    setCorrectAns(ans);
    setUserAns(userAnsArr);
    setOptions(optionArr);
    setVisited(visitedArr);
  };

  // Navigates to the specified question index and marks it as visited
  const handleNavigation = (targetIndex) => {
    markVisited(targetIndex);
    setIndex(targetIndex);
  };

  // Marks a question as visited
  const markVisited = (questionIndex) => {
    setVisited((prevVisited) => {
      const updatedVisited = [...prevVisited];
      updatedVisited[questionIndex] = true;
      return updatedVisited;
    });
  };

  // Handles option selection, toggling the user's answer for the current question
  const handleClick = (QuestionIndex, name) => {
    setUserAns((prevAns) => {
      const updatedAns = [...prevAns];
      updatedAns[QuestionIndex] = updatedAns[QuestionIndex] === name ? "" : name;
      return updatedAns;
    });
  };

  // Evaluates the quiz score based on correct and incorrect answers
  const evaluate = () => {
    return correctAns.reduce((marks, ans, i) => {
      if (userAns[i]) {
        return ans === userAns[i] ? marks + 3 : marks - 0.25; // +3 for correct, -0.25 for incorrect
      }
      return marks; // No penalty for unanswered questions
    }, 0);
  };

  // Submits the quiz and navigates to the feedback page with results
  const submitQuiz = () => {
    const marks = evaluate();
    const data = { marks, questions, options, userAns, correctAns };
    navigate("/feedback", { state: { data } });
  };

  // Determines the status of a question (not visited, visited, or attempted)
  const getQuestionStatus = (index) => {
    if (userAns[index]) return "attempted";
    if (visited[index]) return "visited";
    return "not-visited";
  };

  // Renders navigation buttons for Previous, Next, and Submit actions
  const renderNavigationButtons = () => (
    <div className="flex justify-between">
      {index > 0 && (
        <button
          onClick={() => handleNavigation(index - 1)}
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
        >
          Previous
        </button>
      )}
      {index < questions.length - 1 ? (
        <button
          onClick={() => handleNavigation(index + 1)}
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
        >
          Next
        </button>
      ) : (
        <button
          onClick={submitQuiz}
          className="px-6 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition"
        >
          Submit
        </button>
      )}
    </div>
  );

  // Renders a map of question navigation buttons
  const renderQuestionMap = () => (
    <div className="bg-white p-5 rounded shadow">
      <h4 className="text-lg font-semibold mb-3">Question Map:</h4>
      <div className="grid grid-cols-5 gap-3">
        {questions.map((_, i) => (
          <button
            key={i}
            style={{ padding: 10 }}
            onClick={() => handleNavigation(i)}
            className={`text-sm font-medium rounded ${getButtonClass(i)}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );

  // Determines the button style based on the question status
  const getButtonClass = (index) => {
    const status = getQuestionStatus(index);
    if (status === "not-visited") return "bg-gray-300 hover:bg-gray-400";
    if (status === "visited") return "bg-yellow-300 hover:bg-yellow-400";
    if (status === "attempted") return "bg-green-300 hover:bg-green-400";
    return "";
  };

  // Loading state while questions are being fetched
  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h3 className="text-lg font-semibold text-gray-700">
          Loading questions... Please wait.
        </h3>
      </div>
    );
  }

  // Main render of the quiz page
  return (
    <div className="container mx-auto mt-10 p-5 space-y-10 bg-gray-100 rounded shadow-lg">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar with timer and question map */}
        <div className="lg:w-1/3 space-y-5">
          <div className="bg-blue-100 text-blue-700 p-5 rounded shadow">
            <Timer
              secs={30 * 60} // 30 minutes in seconds
              evaluate={evaluate}
              questions={questions}
              options={options}
              userAns={userAns}
              correctAns={correctAns}
            />
          </div>
          {renderQuestionMap()}
        </div>
        {/* Main content with question and options */}
        <div className="lg:w-2/3 space-y-5">
          <h2 className="text-2xl font-bold bg-white p-5 rounded shadow">
            {index + 1}. {questions[index].question}
          </h2>
          <div className="bg-white p-5 rounded shadow space-y-3">
            {options[index].map((item, idx) => (
              <Options
                key={idx}
                handleClick={handleClick}
                checked={userAns[index] === item}
                Qindex={index}
                name={item}
              />
            ))}
          </div>
          {renderNavigationButtons()}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
