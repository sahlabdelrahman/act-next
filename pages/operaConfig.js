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

  const handleConfig = (e) => {
    e.preventDefault();
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

  const handleLoadDefaults = (e) => {
    e.preventDefault();
    axios
      .post(`http://34.65.51.37/Opera/LoadDefaults`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
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
                <h5>Monthly at</h5>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default OperaConfig;
