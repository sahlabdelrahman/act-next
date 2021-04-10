import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import useInput from "../components/hooks/useInput";
import { useRouter } from "next/router";

const OperaConfig = () => {
  useEffect(() => {
    axios.get("http://34.65.51.37/Opera/GetFilePath").then((res) => {
      setFilePath(res.data);
    });

    axios.get("http://34.65.51.37/Opera/GetCycleTime").then((res) => {
      setHour(res.data.hour);
      setMinute(res.data.min);
    });
  }, []);

  const router = useRouter();

  const {
    value: hour,
    resetValue: resetHour,
    setValue: setHour,
    bind: bindHour,
  } = useInput("");

  const {
    value: minute,
    resetValue: resetMinute,
    setValue: setMinute,
    bind: bindMinute,
  } = useInput("");

  const {
    value: filePath,
    resetValue: resetFilePath,
    setValue: setFilePath,
    bind: bindFilePath,
  } = useInput("");

  const {
    value: numberOfColumns,
    resetValue: resetNumberOfColumns,
    bind: bindNumberOfColumns,
  } = useInput(null);

  const [number, setNumber] = useState(0);

  const handleConfig = () => {
    axios
      .post(`http://34.65.51.37/Opera/UpdateFilePath?FilePath=${filePath}`)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });

    const cycleTimeConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { hour: parseInt(hour), min: parseInt(minute) },
    };

    axios("http://34.65.51.37/Opera/UpdateCycleTime", cycleTimeConfig)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("There was an error!", error);
      });
    router.push({
      pathname: `/operaReportConfig`,
    });
  };

  return (
    <div>
      <Head>
        <title>Opera Config</title>
      </Head>

      <main>
        <div>
          <h5>Daily at</h5>
          <form>
            <div>
              <label>Hour</label>
              <input type="number" min="0" max="23" {...bindHour} />
            </div>
            <div>
              <label>Minute</label>
              <input type="number" min="0" max="59" {...bindMinute} />
            </div>

            <div>
              <label>Path</label>
              <input type="text" {...bindFilePath} />
              <button type="button" onClick={handleConfig}>
                Config
              </button>
            </div>
          </form>
        </div>
        <div>
          <h5>File Config</h5>
          {/* <div>
            <label>Number of columns</label>
            <input type="number" {...bindNumberOfColumns} />
            <button type="button" onClick={() => setNumber(numberOfColumns)}>
              Config
            </button>
          </div> */}
          <div>
            <label>Number of columns</label>
            <button onClick={() => setNumber(number + 1)}>+</button>
            <span>{number}</span>
            <button
              onClick={() => {
                if (number > 0) setNumber(number - 1);
              }}
            >
              -
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
