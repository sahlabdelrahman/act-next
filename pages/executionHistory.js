import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

import { useRouter } from "next/router";

import Header from "../components/header/header.js";
import SideNav from "../components/sideNav/sideNav";
import BreadCrumb from "../components/breadCrumb/breadCrumb";

import Trash from "../public/images/trash.svg";

import Link from "next/link";
import axios from "axios";

import { apiPath } from "../components/apiPath/apiPath";

const executionHistory = () => {
  const router = useRouter();

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get(`${apiPath}ExecutionHistory/Get`).then((res) => {
      setColumns(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .post(
        `${apiPath}ExecutionHistory/Delete?executionHistoryId=${parseInt(id)}`
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("done");
          axios.get(`${apiPath}ExecutionHistory/Get`).then((res) => {
            setColumns(res.data);
          });
        } else {
          alert("error");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <Head>
        <title>Execution History</title>
      </Head>

      <Header />
      <SideNav />

      <main className="main-sun-config">
        <div className="container">
          <div className="main_sun_head">
            <h5>Execution History</h5>
            <BreadCrumb path="executionHistory" page="Execution History" />
          </div>

          <div className="main_sun_body scrollable">
            <div className="container">
              <div className="table">
                <table>
                  <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Settings</th>
                  </tr>
                  {columns.map(({ id, dateTime, type, hdrId }, i) => (
                    <tr key={i}>
                      <td>
                        {hdrId}
                        {"  "}
                      </td>
                      <td>{dateTime}</td>
                      <td>{type}</td>
                      <td>
                        <img
                          src={Trash}
                          alt="Delete"
                          onClick={() => handleDelete(id)}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default executionHistory;
