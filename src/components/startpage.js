import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    const emailRegex = /^[\w-\.]+@[\w-]+\.[a-z]{2,3}$/i;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid Gmail ID");
      return;
    }
    setError("");
    navigate("/quiz",{state: {email}});
  };

  return (
    <div className="start-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome to the Quiz App</h1>
        <p className="text-gray-700 text-center mb-6">Please enter your Gmail ID to start:</p>
        <input
          type="email"
          placeholder="Enter your Gmail ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          onClick={handleStartQuiz}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartPage;
