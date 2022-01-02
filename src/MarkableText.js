import React, { useState, useEffect } from "react";
import "./App.css";
function MarkableText({ value, indices }) {
  const [markup, setMarkup] = useState("");
  useEffect(() => {
    var new_markup = "";
    console.log("value=>\n", value, "\nindices=>", indices);
    if (!indices || indices.length === 0) {
      console.log("indices not found");
      setMarkup(value);
    }
    if (value && indices && indices.length > 0) {
      var lastind = 0;
      var c = 0;
      for (let index of indices) {
        const start = parseInt(index.split(" ")[0]);
        const end = parseInt(index.split(" ")[1]);

        const prevSub = value.substring(lastind, start);

        const sub = value.substring(start, end);

        if (sub.length > 0) {
          new_markup =
            new_markup + prevSub + '<span class="marked">' + sub + "</span>";

          lastind = end;
        }
      }
      new_markup = new_markup + value.substring(lastind);
      setMarkup(new_markup);
    }
  }, [indices, value]);

  return (
    <p className="textarea" dangerouslySetInnerHTML={{ __html: markup }}></p>
  );
}

export default MarkableText;
