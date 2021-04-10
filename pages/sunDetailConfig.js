import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import axios from "axios";
import useInput from "../components/hooks/useInput";

const sunDetailConfig = () => {
  const {
    value: name,
    resetValue: resetName,
    setValue: setName,
    bind: bindName,
  } = useInput("");

  const [columns, setColumns] = useState([]);

  const types = ["DateTime", "Decimal", "Double", "Int", "String", "Short"];

  const [type, setType] = useState("");

  useEffect(() => {
    axios.get("http://34.65.51.37/Sun/Detail/GetColumns").then((res) => {
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
        axios("http://34.65.51.37/Sun/Detail/UpdateColumns", columnsConfig)
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
    setIdOfEditedColumn(name);
  };

  const handleUpdate = () => {
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

  return (
    <div>
      <Head>
        <title>Sun Detail Config</title>
      </Head>

      <main>
        <div>
          <h5>Columns</h5>
          {columns.map(({ name, type, id }, i) => (
            <div key={i}>
              <span>
                Name: {name}
                {"  "}
              </span>
              <span>Type: {type}</span>
              <button onClick={() => handleEdit(name, type, i)}>edit</button>
              <button onClick={() => handleDelete(name)}>delete</button>
            </div>
          ))}
        </div>
        <div>
          <h5>Add column</h5>
          <div>
            <form>
              <label>Name</label>
              <input type="text" {...bindName} required />
              <label>Choose a Type</label>
              <select
                name="columns"
                id="columns"
                onChange={(e) => setType(e.target.value)}
              >
                {types.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {isEdited ? (
                <button type="button" onClick={handleUpdate}>
                  Update Column
                </button>
              ) : (
                <button type="button" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default sunDetailConfig;
