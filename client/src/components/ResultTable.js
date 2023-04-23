import React, { useEffect, useState } from "react";
import { getServerData } from "../helper/helper";
import "../styles/Result.css";

import "bootswatch/dist/quartz/bootstrap.min.css";

export default function ResultTable() {
  const [data, setData] = useState([]);
  const [isVisible] = useState(true);

  useEffect(() => {
    getServerData(`http://localhost:5000/result`, (res) => {
      setData(res);
    });
    console.log("result table data.....", data);
  }, []);

  return (
    <div className={`container my-5 ${isVisible ? "" : "d-none"}`}>
      <div className="d-flex justify-content-end"></div>
      <table className="table table-striped table-hover">
        <thead className="bg-primary text-white">
          <tr>
            <th>Name</th>
            <th>Attempts</th>
            <th>Earn Points</th>
            <th>Result</th>
            <th>Correct Answers</th>
            <th>Wrong Answers</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6}>No Data Found</td>
            </tr>
          ) : (
            data.map((v, i) => (
              <tr
                className="slide-animation"
                style={{ animationDelay: `${0.5 * i}s` }}
                key={i}
              >
                <td>{v?.username || ""}</td>
                <td>{v?.attempts || 0}</td>
                <td>{v?.points || 0}</td>
                <td>{v?.achieved || ""}</td>
                <td>{v?.correct || 0}</td>
                <td>{v?.wrong || 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
