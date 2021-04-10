import React, { useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import useInput from "../components/hooks/useInput";
import { useRouter } from "next/router";

const sunConfig = () => {
  useEffect(() => {
    axios.get("http://34.65.51.37/Sun/GetConnectionString").then((res) => {
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

  const handleConfig = () => {
    axios
      .post(
        `http://34.65.51.37/Sun/UpdateConnectionString?ConnectionString=${connectionString}`
      )
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });

    router.push({
      pathname: `/sunDetailConfig`,
    });
  };

  return (
    <div>
      <Head>
        <title>Sun Config</title>
      </Head>

      <main>
        <div>
          <div>
            <label>Connection</label>
            <input type="text" {...bindConnectionString} />
            <button type="button" onClick={handleConfig}>
              Config
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default sunConfig;
