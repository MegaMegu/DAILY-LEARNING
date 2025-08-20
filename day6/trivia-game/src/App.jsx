import { useEffect, useState, useRef } from "react";

const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const App = () => {
  const [q, setQ] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const didFetch = useRef(false);

  const fetchQuestion = async () => {
    setLoading(true);
    setError(null);
    setAnswered(false);
    setSelected(null);

    try {
      const res = await fetch("http://localhost:5000/api/questions");
      const data = await res.json();
      console.log("API Response:", data);

      if (Array.isArray(data) && data.length > 0) {
        setQ(data[0]); // ✅ take first question
        setShuffledOptions(
          shuffle([...data[0].incorrect_answers, data[0].correct_answer])
        );
      } else {
        setQ(null);
        setError("No questions found in API response");
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!didFetch.current) {
      fetchQuestion();
      didFetch.current = true;
    }
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="rounded-xl px-4 py-5 flex flex-col bg-gradient-to-br from-violet-400 via-indigo-400 to-sky-400 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-white">Trivia Game</h1>

        {error && <p className="text-red-200 mb-4">{error}</p>}

        {loading ? (
          <p className="text-white text-lg">Loading question...</p>
        ) : q ? (
          <div className="bg-gradient-to-br from-sky-400 via-indigo-400 to-violet-400 p-6 rounded-xl max-w-md w-full text-white">
            <h2 className="mb-4 text-lg font-semibold">
              {decodeHTML(q.question)}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {shuffledOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelected(opt);
                    setAnswered(true);
                    if (opt === q.correct_answer) setScore((s) => s + 1);
                  }}
                  disabled={answered}
                  className={`p-3 rounded-xl transition font-medium ${
                    answered
                      ? opt === q.correct_answer
                        ? "bg-green-500"
                        : opt === selected
                        ? "bg-red-500"
                        : "bg-gradient-to-br from-violet-400 via-indigo-400 to-sky-400"
                      : "bg-gradient-to-br from-violet-400 via-indigo-400 to-sky-400 hover:bg-gray-600"
                  }`}
                >
                  {decodeHTML(opt)}
                </button>
              ))}
            </div>

            {answered && (
              <div className="mt-5 flex justify-between items-center">
                <span className="text-lg">Score: {score}</span>
                <button
                  onClick={fetchQuestion}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg"
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        ) : (
          !error && <p className="text-white text-lg">No question available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
