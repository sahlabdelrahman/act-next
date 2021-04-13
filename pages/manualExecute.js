import React from "react";
import Head from "next/head";
import axios from "axios";

import Header from "../components/header/header.js";
import SideNav from "../components/sideNav/sideNav";
import BreadCrumb from "../components/breadCrumb/breadCrumb";

import { apiPath } from "../components/apiPath/apiPath";

const ManualExecute = () => {
  const Config = {
    method: "POST",
  };
  const handleHRMS = (e) => {
    e.preventDefault();
    axios(`${apiPath}HrmsManualExecute/Execute`, Config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  const handleOpera = (e) => {
    e.preventDefault();
    axios(`${apiPath}OperaManualExecute/Execute`, Config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <Head>
        <title>Manual Execute</title>
      </Head>

      <Header />
      <SideNav />

      <main className="main-sun-config">
        <div className="container">
          <div className="main_sun_head">
            <h5>Manual excute</h5>
            <BreadCrumb path="manualExecute" page="Manual excute" />
          </div>

          <div className="main_sun_body">
            <div className="container">
              <div className="manual-details">
                <div style={{ marginRight: "15px" }}>
                  <h5>Excute Opera Now</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>
                  <button onClick={handleOpera}>Excute Opera Now</button>
                </div>
                <div>
                  <h5>Excute HRMS Now</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>
                  <button type="button" onClick={handleHRMS}>
                    Excute HRMS Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default ManualExecute;
