# Quiz App

The Quiz App is a web-based platform designed to test your knowledge through an engaging trivia quiz. It provides a seamless user experience with features like a timer, question navigation, and instant performance feedback.

## 🌟 Features

- Dynamic questions fetched from an API.
- Intuitive navigation to visit or revisit questions.
- Real-time answer selection with marked status.
- Score evaluation with negative marking for wrong answers.
- Final feedback with detailed question-wise analysis.

## 🛠️ Workflow of the Application

### Start Page

- The app begins with a start page where the user inputs their Gmail ID.
- Email validation is performed to ensure only authenticated users proceed.

### Quiz Page

- Fetches 15 random questions from the Open Trivia Database API.
- Displays questions one at a time, with options randomized.
- Tracks user progress, visited questions, and attempted answers.
- Provides a timer to complete the quiz within the set duration (e.g., 30 minutes).
- Allows navigation between questions using the question map or navigation buttons.

### Feedback Page

- Displays the user's total score.
- Shows question-wise analysis, including:
  - The question itself.
  - The selected answer (highlighted as correct or incorrect).
  - The correct answer for each question.

## 🚀 How to Start

### 1. Clone the Repository

```bash
git clone <repository_url>
```

### 2. Navigate to the Project Directory

```bash
cd quiz-app
```

### 3. Install Dependencies

Make sure you have Node.js and npm installed. Then run:

```bash
npm install
```

### 4. Start the Application

To launch the development server, use:

```bash
npm start
```

The app will be accessible at [http://localhost:3000/](http://localhost:3000/) in your browser.

## 🔑 Important Notes

### API Integration

- The app uses the Open Trivia Database API to fetch questions dynamically.
- Ensure you have a stable internet connection for API calls.

### State Management

- The application relies on React's state management to handle user answers, navigation, and quiz flow.

### Navigation & Timer

- The timer counts down from 30 minutes and submits the quiz automatically upon expiration.
- Users can navigate freely using the question map or the "Next" and "Previous" buttons.

### Scoring

- Correct answers score **+3 points**.
- Incorrect answers deduct **-0.25 points**.
- Unattempted questions do not affect the score.

## 🧩 Challenge & Solution

### Challenge: Managing the Option State & Question Categories

- The app needed to display options dynamically and highlight the selected one.
- It also required tracking the question's state across three categories:
  - **Not-Visited**: Questions that the user hasn’t navigated to yet.
  - **Visited**: Questions that the user has viewed but hasn’t answered.
  - **Attempted**: Questions where the user has selected an answer.

### Solution:

#### Options Highlighting:

- Used the `userAns` state to store the user's selected answer for each question.
- Applied conditional class styling to options based on whether they were selected, and whether the selection matched the correct answer.

```jsx
className={`flex items-center p-3 rounded-md ${
  userAns[index] === opt
    ? userAns[index] === correctAns[index]
      ? "bg-green-100 border border-green-400"
      : "bg-red-100 border border-red-400"
    : "bg-gray-100"
}`}
```

#### Tracking Question State:

- Created a `visited` state array initialized with `false` for all questions. The first question was marked as visited by default.
- Updated the `visited` state when navigating to a new question:

```jsx
const markVisited = (questionIndex) => {
  setVisited((prevVisited) => {
    const updatedVisited = [...prevVisited];
    updatedVisited[questionIndex] = true;
    return updatedVisited;
  });
};
```

- Used a helper function to determine a question's category:

```jsx
const getQuestionStatus = (index) => {
  if (userAns[index]) return "attempted";
  if (visited[index]) return "visited";
  return "not-visited";
};
```

#### Visualizing Question Categories:

- Rendered buttons for each question in the "Question Map" with different styles based on their category:

```jsx
const getButtonClass = (index) => {
  const status = getQuestionStatus(index);
  if (status === "not-visited") return "bg-gray-300 hover:bg-gray-400";
  if (status === "visited") return "bg-yellow-300 hover:bg-yellow-400";
  if (status === "attempted") return "bg-green-300 hover:bg-green-400";
  return "";
};
```

### Result:

- This approach ensured accurate tracking of question states and dynamic rendering of options with clear visual feedback, enhancing the overall user experience.

## 💡 Improvements & Customization

Feel free to customize the application by:

- Adding more question categories by modifying the API call.
- Extending the timer duration for a longer quiz.
- Enhancing the UI with CSS frameworks like Tailwind or Material-UI.

Enjoy the app, and happy quizzing! 🎯
