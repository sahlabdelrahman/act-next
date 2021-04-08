import React, { useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import useInput from "../components/hooks/useInput";
import { useRouter } from "next/router";

const HRMSConfig = () => {
  useEffect(() => {
    axios.get("http://34.65.51.37/Hrms/GetConnectionString").then((res) => {
      setConnectionString(res.data);
    });

    axios.get("http://34.65.51.37/Hrms/GetCycleTime").then((res) => {
      setDay(res.data.day);
      setHour(res.data.hour);
      setMinute(res.data.min);
    });
  }, []);
  const router = useRouter();

  const {
    value: day,
    resetValue: resetDay,
    setValue: setDay,
    bind: bindDay,
  } = useInput("");

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
    value: connectionString,
    resetValue: resetConnectionString,
    setValue: setConnectionString,
    bind: bindConnectionString,
  } = useInput("");

  const handleConfig = () => {
    axios
      .post(
        `http://34.65.51.37/Hrms/UpdateConnectionString?ConnectionString=${connectionString}`
      )
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });

    const cycleTimeConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { day: parseInt(day), hour: parseInt(hour), min: parseInt(minute) },
    };

    axios("http://34.65.51.37/Hrms/UpdateCycleTime", cycleTimeConfig)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("There was an error!", error);
      });
    router.push({
      pathname: `/hrmsReportConfig`,
    });
  };

  return (
    <div>
      <Head>
        <title>HRMS Config</title>
      </Head>

      <main>
        <div>
          <h5>monthly at</h5>
          <div>
            <label>Day</label>
            <input type="number" min="0" max="28" {...bindDay} />
          </div>
          <div>
            <label>Hour</label>
            <input type="number" min="0" max="23" {...bindHour} />
          </div>
          <div>
            <label>Minute</label>
            <input type="number" min="0" max="59" {...bindMinute} />
          </div>

          <div>
            <label>Connection</label>
            <input type="text" {...bindConnectionString} />
            <button type="button" onClick={handleConfig}>
              Config
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default HRMSConfig;
