import React, { useEffect, useState, useContext  } from "react";
import NoteContext from '../context/noteContext'; 

const QuizDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const ContextUse = useContext(NoteContext);

 const fetchQuizzes = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/custom/v1/quizzes`);
    const data = await response.json();
    setQuizzes(data);
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchQuizzes();
  }, []);

   const handleViewQuiz = (quizId) => {
    ContextUse.setStartQuiz(1); 
    ContextUse.setQuizId(quizId); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10">
        Select Quiz
      </h1>

      {loading ? (
        <div className="text-center text-xl text-gray-600">Loading quizzes...</div>
      ) : quizzes.length === 0 ? (
        <div className="text-center text-xl text-gray-600">No quizzes found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {quiz.title}
              </h2>
              <button
                onClick={() => handleViewQuiz(quiz.id)}
                className="inline-block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Start
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizDashboard;
