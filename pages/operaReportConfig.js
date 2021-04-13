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

const operaReportConfig = () => {
  const router = useRouter();

  const {
    value: name,
    resetValue: resetName,
    setValue: setName,
    bind: bindName,
  } = useInput("");

  const {
    value: startPos,
    resetValue: resetStartPos,
    setValue: setStartPos,
    bind: bindStartPos,
  } = useInput("");

  const {
    value: endPos,
    resetValue: resetEndPos,
    setValue: setEndPos,
    bind: bindEndPos,
  } = useInput("");

  const [columns, setColumns] = useState([]);

  const types = ["DateTime", "Decimal", "Double", "Int", "String", "Short"];

  const [type, setType] = useState("DateTime");

  useEffect(() => {
    axios.get(`${apiPath}Opera/Report/GetColumns`).then((res) => {
      setColumns(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setColumns([
      ...columns,
      {
        name: name,
        startPOS: parseInt(startPos),
        endPOS: parseInt(endPos),
        type: type,
      },
    ]);
    setName("");
    setStartPos("");
    setEndPos("");
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
        axios(`${apiPath}Opera/Report/UpdateColumns`, columnsConfig)
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

  const handleEdit = (name, type, i, startPos, endPos) => {
    setIsEdited(true);
    setName(name);
    setType(type);
    setStartPos(startPos);
    setEndPos(endPos);
    setIdOfEditedColumn(name);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setColumns(
      columns.map((column) => {
        if (column.name !== idOfeditedColumn) return column;
        return {
          ...column,
          name: name,
          startPOS: parseInt(startPos),
          endPOS: parseInt(endPos),
          type: type,
        };
      })
    );
    setIsEdited(false);
    setName("");
    setStartPos("");
    setEndPos("");
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
      pathname: `/operaIsDone`,
    });
  };

  return (
    <div>
      <Head>
        <title>Opera Report Config</title>
      </Head>

      <Header />
      <SideNav />

      <main className="main-sun-config">
        <div className="container">
          <div className="main_sun_head">
            <h5>Opera Configraution</h5>
            <BreadCrumb path="operaConfig" page="Opera Configraution" />
          </div>

          <div className="main_sun_body scrollable">
            <div className="container">
              <div className="links">
                <div>
                  <Link href="/operaConfig">
                    <a>
                      <img src={NotChecked} alt="NotChecked" />
                      <span>Configraution</span>
                    </a>
                  </Link>
                </div>
                <div className="active">
                  <Link href="/operaReportConfig">
                    <a>
                      <img src={Checked} alt="Checked" />

                      <span>Opera Report Configration</span>
                    </a>
                  </Link>
                </div>
              </div>
              <form
                onSubmit={isEdited ? handleUpdate : handleSubmit}
                className="multi-inputs more"
              >
                <h5>Add new Column</h5>
                <div>
                  <div>
                    <label>Name</label>
                    <input type="text" {...bindName} required />
                  </div>
                  <div>
                    <label>Start position</label>
                    <input type="number" {...bindStartPos} required />
                  </div>
                  <div>
                    <label>End position</label>
                    <input type="number" {...bindEndPos} required />
                  </div>
                  <div className="select-with-label">
                    <label>Choose a Type</label>
                    <select
                      name="columns"
                      id="columns"
                      required
                      value={type}
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
                    <th>Start pos</th>
                    <th>End pos</th>
                    <th>Type</th>
                    <th>Settings</th>
                  </tr>
                  {columns.map(({ name, type, id, startPOS, endPOS }, i) => (
                    <tr key={i}>
                      <td>
                        {name}
                        {"  "}
                      </td>
                      <td>{startPOS}</td>
                      <td>{endPOS}</td>
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
                          onClick={() =>
                            handleEdit(name, type, i, startPOS, endPOS)
                          }
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
export default operaReportConfig;
