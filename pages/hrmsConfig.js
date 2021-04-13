import React, { useEffect, useState } from "react";
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

const HRMSConfig = () => {
  const router = useRouter();

  // const [disable, setDisable] = useState(true);

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

  useEffect(() => {
    axios.get(`${apiPath}Hrms/GetConnectionString`).then((res) => {
      setConnectionString(res.data);
    });

    axios.get(`${apiPath}Hrms/GetCycleTime`).then((res) => {
      setDay(res.data.day);
      setHour(res.data.hour);
      setMinute(res.data.min);
    });
  }, []);

  // useEffect(() => {
  //   console.log(hour.length);
  //   if (day || hour || minute || connectionString) {
  //     setDisable(false);
  //   } else if (!day || !hour || !minute || !connectionString) {
  //     setDisable(true);
  //   }
  // }, [day, hour, minute, connectionString]);

  const handleConfig = (e) => {
    e.preventDefault();
    axios
      .post(
        `${apiPath}Hrms/UpdateConnectionString?ConnectionString=${connectionString}`
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

    axios(`${apiPath}Hrms/UpdateCycleTime`, cycleTimeConfig)
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

      <Header />
      <SideNav />

      <main className="main-sun-config">
        <div className="container">
          <div className="main_sun_head">
            <h5>HRMS Configraution</h5>
            <BreadCrumb path="hrmsConfig" page="HRMS Configraution" />
          </div>
          <div className="main_sun_body">
            <div className="container">
              <div className="links">
                <div className="active">
                  <Link href="/hrmsConfig">
                    <a>
                      <img src={Checked} alt="Checked" />

                      <span>Configration</span>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/hrmsReportConfig">
                    <a>
                      <img src={NotChecked} alt="NotChecked" />
                      <span>HRMS Report Configration</span>
                    </a>
                  </Link>
                </div>
              </div>

              <form onSubmit={handleConfig} className="multi-inputs">
                <h5>Monthly at</h5>
                <div>
                  <div>
                    <label>Day</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="28"
                      {...bindDay}
                    />
                  </div>
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
                    <label>Connection</label>
                    <input type="text" required {...bindConnectionString} />
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
export default HRMSConfig;
