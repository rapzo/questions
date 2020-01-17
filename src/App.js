import React, { useState } from "react";
import "./styles.css";

import { Question1, Answer1 } from "./questions/refactoring";
import { Question2, Answer2 } from "./questions/data-transformation";
import { Question3, Answer3 } from "./questions/testing";

export default function App() {
  const [visibleAnswer, setVisibleAnswer] = useState(0);

  const handleQuestionClick = index => {
    if (index === visibleAnswer) return setVisibleAnswer(0);

    setVisibleAnswer(index);
  };

  const answerClassName = index =>
    `answer__container ${index === visibleAnswer ? "visible" : "invisible"}`;

  return (
    <div className="App">
      <h1>Questions</h1>

      <ol className="menu">
        <li>
          <button onClick={() => handleQuestionClick(1)}>Refactoring</button>
        </li>
        <li>
          <button onClick={() => handleQuestionClick(2)}>
            Data Transformation
          </button>
        </li>
        <li>
          <button onClick={() => handleQuestionClick(3)}>Testing</button>
        </li>
      </ol>

      <section className="answers">
        {!visibleAnswer && (
          <p>Click on the question to toggle its content visibility</p>
        )}
        <div className={answerClassName(1)}>
          <Question1 />
          <Answer1 />
        </div>

        <div className={answerClassName(2)}>
          <Question2 />
          <Answer2 />
        </div>

        <div className={answerClassName(3)}>
          <Question3 />
          <Answer3 />
        </div>
      </section>
    </div>
  );
}
