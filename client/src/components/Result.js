import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import ResultTable from "./ResultTable";
import { useDispatch, useSelector } from "react-redux";
import {
  attempts_Number,
  earnPoints_Number,
  flagResult,
} from "../helper/helper";

/** import actions  */
import { resetAllAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";

export default function Result() {
  const dispatch = useDispatch();
  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);
  //modified today 17-04-2023----------------------------------------------//
  /** store user result */
  // usePublishResult({
  //   result,
  //   username: userId,
  //   attempts,
  //   points: earnPoints,
  //   achived: flag ? "Passed" : "Failed",
  // });

  //passResult was passed-----------------------------
  //this is for results POP-UP WINDOW
  const [showResultTable, setShowResultTable] = useState(false);

  const handleShowResultTable = () => {
    setShowResultTable(true);
  };

  const handleCloseResultTable = () => {
    setShowResultTable(false);
  };
  //--------------------------------------------------------------
  const [isTyping] = useState(false);

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <div className="card result-card bg-dark text-white">
        <div className="card-header">
          <h2 className="card-title">Quiz Result</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h4 className="card-text m-sm-auto m-lg-1 mb-1" id="underlines">
                Username:
              </h4>

              <h4 className="card-text m-sm-auto m-lg-1 mb-1" id="underlines">
                Total Attempts:
              </h4>

              <h4 className="card-text m-sm-auto m-lg-1 mb-1" id="underlines">
                Total Earn Points:
              </h4>

              <h4 className="card-text m-sm-auto m-lg-1 mb-1" id="underlines">
                Total Quiz Points:
              </h4>

              <h4 className="card-text m-sm-auto m-lg-1 mb-1" id="underlines">
                Total Questions:
              </h4>

              <h4 className="card-text m-sm-auto m-lg-1 mb-1" id="underlines">
                Quiz Result:
              </h4>
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-between align-items-end mt-0">
              <p
                id="underlines"
                className={
                  isTyping ? "card-text-typing" : "card-text m-0 pt-0 "
                }
              >
                {userId || ""}
              </p>

              <p
                id="underlines"
                className={
                  isTyping
                    ? "card-text-typing"
                    : "card-text m-0 pt-0 fs-5 strong"
                }
              >
                {attempts || 0}
              </p>

              <p
                id="underlines"
                className={
                  isTyping
                    ? "card-text-typing"
                    : "card-text m-0 pt-0 fs-5 strong"
                }
              >
                {earnPoints || 0}
              </p>

              <p
                id="underlines"
                className={
                  isTyping
                    ? "card-text-typing"
                    : "card-text m-0 pt-0 fs-5 strong"
                }
              >
                {totalPoints || 0}
              </p>

              <p
                id="underlines"
                className={
                  isTyping
                    ? "card-text-typing"
                    : "card-text m-0 pt-0 fs-5 strong"
                }
              >
                {queue.length || 0}
              </p>

              <p
                id="underlines"
                className="card-text mt-0 pt-0"
                style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
              >
                {flag ? "Passed" : "Failed"}
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer text-center">
          <Link className="btn btn-primary" to={"/"} onClick={onRestart}>
            Restart
          </Link>

          <button
            className="btn btn-secondary m-1"
            onClick={handleShowResultTable}
          >
            Show Result Table
          </button>
        </div>
      </div>
      {showResultTable && (
        <div className="popwind">
          <button
            className="btn btn-secondary m-1 waves-effect waves-light"
            onClick={handleCloseResultTable}
            id="closebutton"
          >
            Close
          </button>
          <div className="popwind-inside">
            <ResultTable />
          </div>
        </div>
      )}
    </div>
  );
}
