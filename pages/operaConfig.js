import React, { useState } from "react";
import Head from "next/head";

import useInput from "../components/hooks/useInput";

const OperaConfig = () => {
  const {
    value: numberOfColumns,
    resetValue: resetNumberOfColumns,
    bind: bindNumberOfColumns,
  } = useInput(null);

  const [number, setNumber] = useState(null);

  return (
    <div>
      <Head>
        <title>Opera Config</title>
      </Head>

      <main>
        <div>
          <h5>Daily at</h5>
          <div>
            <label>Hour</label>
            <input type="number" min="0" max="23" />
          </div>
          <div>
            <label>Minute</label>
            <input type="number" min="0" max="59" />
          </div>

          <div>
            <label>Path</label>
            <input type="text" />
          </div>
        </div>
        <div>
          <h5>File Config</h5>
          <div>
            <label>Number of columns</label>
            <input type="number" {...bindNumberOfColumns} />
            <button type="button" onClick={() => setNumber(numberOfColumns)}>
              Config
            </button>
          </div>
        </div>
        {number ? (
          <div>
            <h5>Config of each column</h5>
            {Array.from(Array(parseInt(number)), (e, i) => {
              return (
                <div key={i}>
                  <span>{i + " "}</span>
                  <label>Name</label>
                  <input type="text" required />
                  <label>Start position</label>
                  <input type="number" required />
                  <label>End position</label>
                  <input type="number" required />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};
export default OperaConfig;
