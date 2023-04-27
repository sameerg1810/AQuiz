import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserId } from "../redux/result_reducer";
import "../styles/Main.css";
import "../styles/App.css";

export default function Main() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [isStartButtonClicked, setIsStartButtonClicked] = useState(true);

  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
      setIsStartButtonClicked(true);
    }
  }

  return (
    <div>
      <div
        className={`container card bg-transparent ${
          isStartButtonClicked ? "card-shutter" : ""
        }`}
      >
        <h1 className="card-title border-2 text-center">Quiz Application</h1>

        <ol className="card-body text-light">
          <li>You will be asked 10 questions one after another.</li>
          <li>10 points is awarded for the correct answer.</li>
          <li>
            Each question has three options. You can choose only one options.
          </li>
          <li>You can review and change answers before the quiz finish.</li>
          <li>The result will be declared at the end of the quiz.</li>
        </ol>

        <form id="form" className="d-flex justify-content-center ">
          <i className="fas fa-user"></i>
          <input
            ref={inputRef}
            className="userid w-50 form-control"
            type="text"
            placeholder="Username*"
          />
        </form>

        {!isStartButtonClicked && (
          <div className="start d-flex justify-content-center mt-1">
            <Link
              className="btn center alert rounded-1 bg-success"
              to={"quiz"}
              onClick={startQuiz}
            >
              Start Quiz
            </Link>
          </div>
        )}
      </div>

      {isStartButtonClicked && (
        <div className="card-shutter-content bg-light bg-opacity-75">
          <div className="containerx">
            <div className="cloud front">
              <span className="left-front"></span>
              <button
                className="lets-go-button border-0 text-dark"
                onClick={() => setIsStartButtonClicked(false)}
              >
                LET`S GO!
              </button>
              <span className="right-front"></span>
            </div>
            <span className="sun sunshine"></span>
            <span className="sun"></span>
            <div className="cloud back">
              <span className="left-back"></span>
              <span className="right-back"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
