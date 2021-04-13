import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import useInput from "../components/hooks/useInput";
import { useRouter } from "next/router";

import Header from "../components/header/header.js";
import SideNav from "../components/sideNav/sideNav";
import BreadCrumb from "../components/breadCrumb/breadCrumb";

import Checked from "../public/images/checked.svg";
import NotChecked from "../public/images/notChecked.svg";
import Link from "next/link";

import { apiPath } from "../components/apiPath/apiPath";

const OperaConfig = () => {
  useEffect(() => {
    axios.get(`${apiPath}Opera/GetFilePath`).then((res) => {
      setFilePath(res.data);
    });

    axios.get(`${apiPath}Opera/GetCycleTime`).then((res) => {
      setHour(res.data.hour);
      setMinute(res.data.min);
    });

    axios
      .get(`${apiPath}Opera/GetNumberOfLinesToBeIgnoredAtTheBeginning`)
      .then((res) => {
        setFromStart(res.data);
      });
    axios
      .get(`${apiPath}Opera/GetNumberOfLinesToBeIgnoredAtTheEnd`)
      .then((res) => {
        setFromEnd(res.data);
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

  const {
    value: fromStart,
    resetValue: resetFromStart,
    setValue: setFromStart,
    bind: bindFromStart,
  } = useInput("");

  const {
    value: fromEnd,
    resetValue: resetFromEnd,
    setValue: setFromEnd,
    bind: bindFromEnd,
  } = useInput("");

  const [number, setNumber] = useState(0);

  const handleConfig = (e) => {
    e.preventDefault();
    axios
      .post(`${apiPath}Opera/UpdateFilePath?FilePath=${filePath}`)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });

    const cycleTimeConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { hour: parseInt(hour), min: parseInt(minute) },
    };

    axios(`${apiPath}Opera/UpdateCycleTime`, cycleTimeConfig)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleLoadDefaults = (e) => {
    e.preventDefault();
    axios
      .post(`${apiPath}Opera/LoadDefaults`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });
  };

  const handleIgnored = (e) => {
    e.preventDefault();
    axios
      .post(
        `${apiPath}Opera/UpdateNumberOfLinesToBeIgnored?NumberOfLinesToBeIgnoredAtTheBeginning=${parseInt(fromStart)}&NumberOfLinesToBeIgnoredAtTheEnd=${parseInt(fromEnd)}`
      )
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });

    
  };

  ;

  const handleDone = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/operaReportConfig`,
    });
  };

  return (
    <div>
      <Head>
        <title>Opera Config</title>
      </Head>
      <Header />
      <SideNav />

      <main className="main-sun-config">
        <div className="container">
          <div className="main_sun_head">
            <div className="head">
              <h5>Opera Configraution</h5>
              <span type="button" onClick={handleLoadDefaults}>
                Load Defaults
              </span>
            </div>
            <BreadCrumb path="operaConfig" page="Opera Configraution" />
          </div>
          <div className="main_sun_body">
            <div className="container">
              <div className="links">
                <div className="active">
                  <Link href="/operaConfig">
                    <a>
                      <img src={Checked} alt="Checked" />

                      <span>Configration</span>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/operaReportConfig">
                    <a>
                      <img src={NotChecked} alt="NotChecked" />
                      <span>Opera Report Configration</span>
                    </a>
                  </Link>
                </div>
              </div>
              <form onSubmit={handleConfig} className="multi-inputs">
                <h5>Daily at</h5>
                <div>
                  <div>
                    <label>Hour</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="23"
                      {...bindHour}
                    />
                  </div>
                  <div>
                    <label>Minute</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="59"
                      {...bindMinute}
                    />
                  </div>

                  <div>
                    <label>Path</label>
                    <input type="text" required {...bindFilePath} />
                    <button type="submit">Config</button>
                  </div>
                </div>
              </form>
              <form onSubmit={handleIgnored} className="multi-inputs more">
                <h5 style={{ marginTop: "15px", marginBottom: "15px" }}>
                  Number of lines to be ignored
                </h5>
                <div>
                  <div>
                    <label>From Start</label>
                    <input type="number" {...bindFromStart} required />
                  </div>
                  <div>
                    <label>From End</label>
                    <input type="number" {...bindFromEnd} required />
                  </div>

                  <div>
                    <button type="submit">Ignore</button>
                    <button type="button" onClick={handleDone}>
                      Done
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default OperaConfig;
