import React from "react";
import Head from "next/head";
import axios from "axios";
import { apiPath } from "../components/apiPath/apiPath";

import Group from "../public/images/group.png";
import num from "../public/images/98.png";

export default function Home() {
  const handleDefaults = (e) => {
    e.preventDefault();
    axios
      .post(`${apiPath}Sun/LoadDefaults`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });

    axios
      .post(`${apiPath}Mapping/HrmsToSun/ReportToDetail/LoadDefaults`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });

    axios
      .post(`${apiPath}Mapping/HrmsToSun/ReportToHdr/LoadDefaults`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });
    axios
      .post(`${apiPath}Mapping/OperaToSun/ReportToDetail/LoadDefaults`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });
    axios
      .post(`${apiPath}Mapping/OperaToSun/ReportToHDR/LoadDefaults`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });

    axios
      .post(`${apiPath}Opera/LoadDefaults`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });

    axios
      .post(`${apiPath}Opera/LoadDefaults`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main>
        <div id="black-corner" class="text-center d-flex align-items-center">
          <img
            class="d-block m-auto"
            width="182"
            height="80"
            src={num}
            alt=""
          />
        </div>
        <div id="orange-corner"></div>
        <div id="white-circle"></div>
        <div id="FC2839-largeCircle"></div>
        <div id="FC2839-smallCircle"></div>
        <div id="all-content" class="row m-auto">
          <div class="col-12 col-lg-6 m-auto order-2 order-lg-1">
            <h2 class="mb-3 ml-auto mr-auto">create like never before</h2>
            <p class="ml-auto mr-auto mb-3">
              welcome to our application, let's start connecting
            </p>
            <div class="m-auto">
              <a href="#" id="button">
                get started
              </a>
              <a href="#" id="link">
                how it works?
              </a>
            </div>
          </div>
          <div id="img-div" class="col-12 col-lg-6 m-auto order-1 order-lg-2">
            <img
              class="d-block m-auto"
              src={Group}
              width="532"
              height="513"
              alt=""
            />
          </div>
        </div>
      </main> */}

      <main>
        <button onClick={handleDefaults}>Load all Defaults</button>
      </main>
    </div>
  );
}
