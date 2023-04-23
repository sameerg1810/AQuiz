import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserId } from "../redux/result_reducer";
import "../styles/Main.css";
import "../styles/App.css";

export default function Main() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
    }
  }

  return (
    <div className="container card bg-transparent">
      <h1 className="card-title  border-2 text-center">Quiz Application</h1>

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

      <div className="start d-flex justify-content-center mt-1">
        <Link
          className="btn center alert rounded-1 bg-success"
          to={"quiz"}
          onClick={startQuiz}
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
