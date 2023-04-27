import React, { useState } from "react";
import Questions from "./Questions";
import Timer from "react-compound-timer";
import "../styles/App.css";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";
import { earnPoints_Number, flagResult } from "../helper/helper";
/** redux store import */
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Quiz() {
  const notify = () =>
    toast("You are about to exit the quiz..!", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      progressBar: true,
      theme: "colored",
    });
  const [check, setChecked] = useState(undefined);
  const navigate = useNavigate();
  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  const {
    questions: { answers },
    result: { userId },
  } = useSelector((state) => state);

  /** next button event handler */
  function onNext() {
    if (trace < queue.length) {
      /** increase the trace value by one using MoveNextAction */
      dispatch(MoveNextQuestion());

      /** insert a new result in the array.  */
      if (result.length <= trace) {
        dispatch(PushAnswer(check)).then(() => {
          if (trace === queue.length - 1) {
            passResult();
          }
        });
      }
    }

    /** reset the value of the checked variable */
    setChecked(undefined);
  }

  /** Prev button event handler */
  function onPrev() {
    if (trace > 0) {
      /** decrease the trace value by one using MovePrevQuestion */
      dispatch(MovePrevQuestion());
    }
  }
  function passResult() {
    const totalPoints = queue.length * 10;
    const earnPoints = earnPoints_Number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);
    fetch(`https://qiz.onrender.com/result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        result,
        username: userId,
        points: earnPoints,
        passFail: flag ? "Passed" : "Failed",
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  }

  function onChecked(check) {
    setChecked(check);
  }

  /** finished exam after the last question */
  if (result.length && result.length >= queue.length) {
    return <Navigate to={"/result"} replace={true}></Navigate>;
  }

  return (
    <div className="container">
      <h1 className="title">Quiz Application</h1>
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <button
        className="moon-container quit-btn"
        onClick={() => {
          notify();
          setTimeout(() => {
            navigate("/result");
          }, 10000);
        }}
      >
        <div className="moon">
          <div className="mancha2"></div>
        </div>
        <div className="moon-text">Quit</div>
      </button>

      {/* display questions */}
      <Questions onChecked={onChecked} />

      <div className="timer-container mb-1">
        {" "}
        <h2 className="timer-label text-center">EVIL SCI-FI TIMER</h2>
        <div className="timer">
          <Timer
            initialTime={60 * 1000}
            direction="backward"
            timeToUpdate={10}
            checkpoints={[
              {
                time: 0,
                callback: () => {
                  alert("countdown finished");
                  navigate("/Result");
                },
              },
            ]}
          >
            <div className="timer">
              <span style={{ fontSize: 32 }}>
                <Timer.Minutes />:
              </span>
              <span style={{ fontSize: 32 }}>
                <Timer.Seconds />
              </span>
            </div>
          </Timer>
        </div>
      </div>
      <div className="grid">
        {trace > 0 ? (
          <button className="btn prev" onClick={onPrev}>
            Prev
          </button>
        ) : (
          <div></div>
        )}
        <button className="btn next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}
