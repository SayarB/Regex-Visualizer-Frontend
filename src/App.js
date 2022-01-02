import "./App.css";
import { useEffect, useState } from "react";
import MarkableText from "./MarkableText";

function App() {
  const [input, setInput] = useState("a");
  const [testString, setTestString] = useState(
    "At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies."
  );

  const [indexArr, setIndexArr] = useState([]);

  useEffect(() => {
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
