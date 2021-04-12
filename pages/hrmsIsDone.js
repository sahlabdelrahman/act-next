import React from "react";
import Head from "next/head";

import { useRouter } from "next/router";

import Header from "../components/header/header.js";
import SideNav from "../components/sideNav/sideNav";
import BreadCrumb from "../components/breadCrumb/breadCrumb";

import GreenChecked from "../public/images/greenChecked.svg";
import LgGreenChecked from "../public/images/lgGreenChecked.svg";

import Link from "next/link";

const hrmsIsDone = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>HRMS Is Done</title>
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
                <div className="active-green">
                  <Link href="/hrmsConfig">
                    <a>
                      <img src={GreenChecked} alt="greenChecked" />
                      <span>HRMS Configraution</span>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="details">
                <img src={LgGreenChecked} alt="lgGreenChecked" />
                <h5>Configuration Succesful</h5>
                <div className="buttons">
                  <Link href="/hrmsConfig">
                    <a className="first">Add new HRMS Configration</a>
                  </Link>
                  <Link href="/">
                    <a className="second">Back to home</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default hrmsIsDone;
