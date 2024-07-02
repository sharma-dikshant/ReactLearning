import { useState } from "react";
import "./App.css";

const messages = ["Learn React *", "Apply for job ", "invest your new income"];

export default function App() {
  const [step, setStep] = useState(1);

  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }
  function handleNext() {
    if (step < 3) setStep(step + 1);
  }
  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`${step >= 3 ? "active" : ""}`}>3</div>
      </div>
      <div className="message">
        <p>
          Steps {step} : {messages[step - 1]}
        </p>
      </div>
      <div className="buttons">
        <button onClick={handlePrevious}>previous</button>
        <button onClick={handleNext}>next</button>
      </div>
    </div>
  );
}
