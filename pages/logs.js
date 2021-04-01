import React, { useEffect, useState } from "react";
import axios from "axios";

const Logs = () => {
  const [logs, setLogs] = useState("");

  useEffect(() => {
    axios.get("http://34.65.51.37/Logs").then((res) => {
      setLogs(res.data);
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://34.65.51.37/Logs").then((res) => {
        setLogs(res.data);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // const printLogs = (e) => {
  //   e.preventDefault();
  //   console.log(logs);
  // };

  return (
    <main>
      <p>{logs}</p>
    </main>
  );
};

export default Logs;
