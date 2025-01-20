import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!location.state?.data) {
      navigate('/'); // Redirect if no data is available
    }
  }, [location, navigate]);

  const { marks = 0, questions = [], options = [], userAns = [], correctAns = [] } = location.state?.data || {};

  // Renders a single question and its details
  const renderQuestionOverview = (question, index) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200" key={index}>
      {/* Question */}
      <h3 className="text-lg font-bold text-gray-700 mb-4">
        {index + 1}. {question}
      </h3>

      {/* Options */}
      <div className="space-y-2">
        {options[index].map((opt, idx) => (
          <div
            key={idx}
            className={`flex items-center p-3 rounded-md ${
              userAns[index] === opt
                ? userAns[index] === correctAns[index]
                  ? "bg-green-100 border border-green-400"
                  : "bg-red-100 border border-red-400"
                : "bg-gray-100"
            }`}
          >
            <input
              type="radio"
              className="h-5 w-5 mr-3"
              checked={userAns[index] === opt}
              disabled
            />
            <label
              className={`text-md ${
                userAns[index] === opt
                  ? userAns[index] === correctAns[index]
                    ? "text-green-700 font-semibold"
                    : "text-red-700 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {opt}
            </label>
          </div>
        ))}
      </div>

      {/* Correct Answer */}
      <div className="mt-5">
        <h4 className="text-green-600 font-semibold">Correct Answer:</h4>
        <div className="flex items-center mt-2 bg-green-100 p-3 rounded-md border border-green-400">
          <input type="radio" className="h-5 w-5 mr-3" checked={true} disabled />
          <span className="text-green-700 font-semibold">{correctAns[index]}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-5 bg-gray-100 min-h-screen">
      {/* Scorecard */}
      <div className="flex justify-center mt-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          <h3 className="text-2xl font-semibold text-blue-600">
            Your Score: <span className="text-green-500">{marks}</span> Marks
          </h3>
          <p className="text-gray-600 mt-2">
            Thank you for completing the quiz! Here's an overview of your performance.
          </p>
        </div>
      </div>

      {/* Test Overview */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-10">Test Overview</h2>
        <div className="space-y-6">
          {questions.map((item, index) => renderQuestionOverview(item.question, index))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
