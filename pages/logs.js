import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/header/header.js";
import SideNav from "../components/sideNav/sideNav";
import BreadCrumb from "../components/breadCrumb/breadCrumb";
import Link from "next/link";
import Head from "next/head";

import { apiPath } from "../components/apiPath/apiPath";

const Logs = () => {
  const [logs, setLogs] = useState("");

  useEffect(() => {
    axios.get(`${apiPath}Logs`).then((res) => {
      setLogs(res.data);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${apiPath}Logs`).then((res) => {
        setLogs(res.data);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Sun Config</title>
      </Head>
      <Header />
      <SideNav />

      <main className="main-sun-config">
        <div className="container">
          <div className="main_sun_head">
            <h5>Logs</h5>
            <BreadCrumb path="logs" page="Logs" />
          </div>

          <div className="main_sun_body">
            <div className="container">
              <div
                className="details"
                style={{
                  overflow: "auto",
                  position: "relative",
                  marginTop: "70px",
                }}
              >
                <p style={{ position: "absolute", left: "0px", top: "0px" }}>
                  {logs}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Logs;
