import { useState } from "react";
import axios from "axios";

const App = () => {
  const [joke, setJoke] = useState("Tap the button to generate a joke");

  const getJoke = async () => {
    try {
      const res = await axios.get("http://localhost:5000/joke");
      setJoke(res.data.joke);
    } catch (err) {
      console.error(`Error fetching joke: ${err}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gradient-to-br from-red-400 via-pink-400 to-purple-400 p-6 rounded-xl flex flex-col items-center justify-between max-w-md">
        <h1 className="text-white text-center font-bold">Joke Time Muna</h1>
        <div className="text-white flex justify-center items-center flex-col gap-9">
          <h2 className="text-white text-center font-semibold">{joke}</h2>
          <button
            onClick={getJoke}
            className="text-white justify-center border-2 border-red-300 outline-none rounded-xl p-2 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 hover:cursor-pointer hover:scale-109 transition"
          >
            Make me laugh
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
