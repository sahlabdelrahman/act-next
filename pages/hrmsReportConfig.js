import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import axios from "axios";
import useInput from "../components/hooks/useInput";
import { useRouter } from "next/router";

import Header from "../components/header/header.js";
import SideNav from "../components/sideNav/sideNav";
import BreadCrumb from "../components/breadCrumb/breadCrumb";

import Checked from "../public/images/checked.svg";
import NotChecked from "../public/images/notChecked.svg";
import Trash from "../public/images/trash.svg";
import Edit from "../public/images/edit.svg";
import Link from "next/link";

import { apiPath } from "../components/apiPath/apiPath";

const HRMSReportConfig = () => {
  const router = useRouter();
  const {
    value: name,
    resetValue: resetName,
    setValue: setName,
    bind: bindName,
  } = useInput("");

  const [columns, setColumns] = useState([]);

  const types = ["DateTime", "Decimal", "Double", "Int", "String", "Short"];

  const [type, setType] = useState("DateTime");

  useEffect(() => {
    axios.get(`${apiPath}Hrms/Report/GetColumns`).then((res) => {
      setColumns(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setColumns([...columns, { name: name, type: type }]);
    setName("");
    setType("");
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      // do something after state has updated
      if (columns.length > 0) {
        const columnsConfig = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: [...columns],
        };
        axios(`${apiPath}Hrms/Report/UpdateColumns`, columnsConfig)
          .then((res) => console.log(res))
          .catch((error) => {
            console.error("There was an error!", error);
          });
      } else {
        alert("Error!");
      }
    }
  }, [columns]);

  useEffect(() => {
    isFirstRender.current = false; // toggle flag after first render/mounting
  }, []);

  const [isEdited, setIsEdited] = useState(false);

  const [idOfeditedColumn, setIdOfEditedColumn] = useState("");

  const handleEdit = (name, type, i) => {
    setIsEdited(true);
    setName(name);
    setType(type);
    setIdOfEditedColumn(name);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setColumns(
      columns.map((column) => {
        if (column.name !== idOfeditedColumn) return column;
        return { ...column, name: name, type: type };
      })
    );
    setIsEdited(false);
    setName("");
    setType("");
  };

  const handleDelete = (name) => {
    if (columns.length > 0) {
      const newColumns = columns.filter((item) => item.name !== name);
      setColumns([...newColumns]);
    }
  };

  const handleDone = () => {
    router.push({
      pathname: `/hrmsIsDone`,
    });
  };
  return (
    <div>
      <Head>
        <title>HRMS Report Config</title>
      </Head>

      <Header />
      <SideNav />

      <main className="main-sun-config">
        <div className="container">
          <div className="main_sun_head">
            <h5>HRMS Configraution</h5>
            <BreadCrumb path="hrmsConfig" page="HRMS Configraution" />
          </div>

          <div className="main_sun_body scrollable">
            <div className="container">
              <div className="links">
                <div>
                  <Link href="/hrmsConfig">
                    <a>
                      <img src={NotChecked} alt="NotChecked" />
                      <span>Configraution</span>
                    </a>
                  </Link>
                </div>
                <div className="active">
                  <Link href="/hrmsReportConfig">
                    <a>
                      <img src={Checked} alt="Checked" />

                      <span>HRMS Report Configration</span>
                    </a>
                  </Link>
                </div>
              </div>

              <form
                onSubmit={isEdited ? handleUpdate : handleSubmit}
                className="multi-inputs"
              >
                <h5>Add new Column</h5>
                <div>
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      required
                      {...bindName}
                      required
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="select-with-label">
                    <label>Choose a Type</label>
                    <select
                      name="columns"
                      id="columns"
                      value={type}
                      required
                      onChange={(e) => setType(e.target.value)}
                    >
                      {types.map((type, i) => (
                        <option key={i} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {isEdited ? (
                      <button type="submit">Update Column</button>
                    ) : (
                      <button type="submit">Submit</button>
                    )}
                    <button type="button" onClick={handleDone}>
                      Done
                    </button>
                  </div>
                </div>
              </form>
              <div className="table">
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Settings</th>
                  </tr>

                  {columns.map(({ name, type, id }, i) => (
                    <tr key={i}>
                      <td>
                        {name}
                        {"  "}
                      </td>
                      <td>{type}</td>
                      <td>
                        <img
                          src={Trash}
                          alt="Delete"
                          onClick={() => handleDelete(name)}
                        />

                        <img
                          src={Edit}
                          alt="Edit"
                          onClick={() => handleEdit(name, type, i)}
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
export default HRMSReportConfig;
