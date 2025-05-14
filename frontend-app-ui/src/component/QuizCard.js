import React, { useState, useEffect, useContext } from "react";
import NoteContext from "../context/noteContext";

const QuizCard = () => {
  const [quizData, setQuizData] = useState(null); // will store { id, title, questions[] }
  const [selectedAnswers, setSelectedAnswers] = useState({}); // key: question index, value: selected option index
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const ContextUse = useContext(NoteContext);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/custom/v1/quiz/${ContextUse.quizId}`
      );
      const data = await response.json();
      setQuizData(data);
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleOptionChange = (qIndex, optionIndex) => {
    if (!submitted) {
      setSelectedAnswers({
        ...selectedAnswers,
        [qIndex]: optionIndex,
      });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length === quizData.questions.length) {
      setSubmitted(true);
    } else {
      alert("Please answer all questions before submitting.");
    }
  };
  const handleBackDashboardSubmit = () => {
   ContextUse.setStartQuiz(0); 
    ContextUse.setQuizId(0); 
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!quizData) return <div className="text-center mt-10">Quiz not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full mt-10">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          {quizData.title}
        </h1>

        {quizData.questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-8">
            <h2 className="text-lg font-semibold mb-4">{qIndex + 1}. {question.text}</h2>
            <div className="space-y-3">
              {question.choices.map((choice, choiceIndex) => {
                const isSelected = selectedAnswers[qIndex] === choiceIndex;
                const isCorrect = question.correct-1 === choiceIndex;
                const submittedAndSelected = submitted && isSelected;
                const submittedAndCorrect = submitted && isCorrect;

                return (
                  <label
                    key={choiceIndex}
                    className={`block px-4 py-2 rounded-lg border cursor-pointer transition ${
                      submitted
                        ? submittedAndCorrect
                          ? "bg-green-100 border-green-500 text-green-700"
                          : submittedAndSelected
                          ? "bg-red-100 border-red-500 text-red-700"
                          : "border-gray-300"
                        : "hover:bg-indigo-50 border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value={choiceIndex}
                      className="mr-2 accent-indigo-600"
                      disabled={submitted}
                      checked={isSelected}
                      onChange={() => handleOptionChange(qIndex, choiceIndex)}
                    />
                    {choice}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
          disabled={submitted}
        >
          {submitted ? "Submitted" : "Submit Quiz"}
        </button>

        {submitted && (
          <div className="mt-6 text-center text-lg font-medium text-indigo-800">
            You got {quizData.questions.filter((q, i) => selectedAnswers[i] === q.correct-1).length} out of {quizData.questions.length} correct.
          <button
          onClick={handleBackDashboardSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Back
        </button>
          
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
