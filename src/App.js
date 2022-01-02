import "./App.css";
import { useEffect, useState } from "react";
import MarkableText from "./MarkableText";

function App() {
  const [input, setInput] = useState("a");
  const [testString, setTestString] = useState(
    "A computer does two things, and two things only. It performs calculations and it remembers the results of those calculations. But it does those two things extremely well. The typical computer that sits on a desk or in a briefcase performs a billion or so calculations a second. It’s hard to image how truly fast that is. Think about holding a ball a meter above the floor, and letting it go. By the time it reaches the floor, your computer could have executed over a billion instructions. As for memory, a small computer might have hundreds of gigabytes of storage. How big is that? If a byte (the number of bits, typically eight, required to represent one character) weighed one gram (which it doesn’t), 100 gigabytes would weigh 10,000 metric tons. For comparison, that’s roughly the combined weight of 15,000 African elephants. For most of human history, computation was limited by the speed of calculation of the human brain and the ability to record computational results with the human hand. This meant that only the smallest problems could be attacked computationally. Even with the speed of modern computers, there are still problems that are beyond modern computational models (e.g., understanding climate change), but more and more problems are proving amenable to computational solution. It is our hope that by the time you finish this book, you will feel comfortable bringing computational thinking to bear on solving many of the problems you encounter during your studies, work, and even everyday life. What do we mean by computational thinking?"
  );

  const [indexArr, setIndexArr] = useState([]);

  useEffect(() => {
    async function getOutput() {
      const res = await fetch(
        "https://regex-visualizer-backend.herokuapp.com/run",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ regex: input, text: testString }),
        }
      );
      const indices = await res.json();
      setIndexArr(indices);
    }
    getOutput();
  }, [input, testString]);

  return (
    <div className="app">
      <h1 className="header">Type your Regex Pattern</h1>
      <input
        autoFocus
        type="text"
        name=""
        className="input_text"
        id="text_box"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />

      <MarkableText value={testString} indices={indexArr} />
      <h2>Change Text</h2>
      <textarea
        name=""
        id="text_change"
        cols="30"
        rows="10"
        value={testString}
        onChange={(e) => {
          setTestString(e.target.value);
        }}
      ></textarea>
      {/* <button
        onClick={() => {
          async function getOutput() {
            const res = await fetch("http://192.168.0.6:8000/run", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ regex: input, text: testString }),
            });
            const indices = await res.json();
            setIndexArr(indices);
          }
          getOutput();
        }}
      >
        reload
      </button> */}
    </div>
  );
}

export default App;
