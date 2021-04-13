import React, { useEffect } from "react";
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

const sunConfig = () => {
  useEffect(() => {
    axios.get(`${apiPath}Sun/GetConnectionString`).then((res) => {
      setConnectionString(res.data);
    });
  }, []);

  const router = useRouter();

  const {
    value: connectionString,
    resetValue: resetConnectionString,
    setValue: setConnectionString,
    bind: bindConnectionString,
  } = useInput("");

  const handleConfig = (e) => {
    e.preventDefault();
    axios
      .post(
        `${apiPath}Sun/UpdateConnectionString?ConnectionString=${connectionString}`
      )
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });

    router.push({
      pathname: `/sunDetailConfig`,
    });
  };

  const handleLoadDefaults = (e) => {
    e.preventDefault();
    axios
      .post(`${apiPath}Sun/LoadDefaults`)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });
  };

  return (
    <div>
      <Head>
        <title>Sun Config</title>
      </Head>
      <Header />
      <SideNav />

      <main className="main-sun-config">
        <div className="container">
          <div className="main_sun_head">
            <div className="head">
              <h5>Sun Configraution</h5>
              <span type="button" onClick={handleLoadDefaults}>
                Load Defaults
              </span>
            </div>
            <BreadCrumb path="sunConfig" page="Sun Configraution" />
          </div>
          <div className="main_sun_body">
            <div className="container">
              <div className="links">
                <div className="active">
                  <Link href="/sunConfig">
                    <a>
                      <img src={Checked} alt="Checked" />

                      <span>Configration</span>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/sunDetailConfig">
                    <a>
                      <img src={NotChecked} alt="NotChecked" />
                      <span>Sun Detail Configration</span>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/sunHDRConfig">
                    <a>
                      <img src={NotChecked} alt="NotChecked" />
                      <span>Sun HDR Configration</span>
                    </a>
                  </Link>
                </div>
              </div>
              <form onSubmit={handleConfig}>
                <label>Connection</label>
                <input
                  type="text"
                  placeholder="Connection"
                  required
                  {...bindConnectionString}
                />
                <button type="submit">Config</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default sunConfig;
