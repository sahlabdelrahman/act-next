import React from "react";
import Head from "next/head";

const HRMSConfig = () => {
  return (
    <div>
      <Head>
        <title>HRMS Config</title>
      </Head>

      <main>
        <div>
          <h5>monthly at</h5>
          <div>
            <label>Day</label>
            <input type="number" min="0" max="28" />
          </div>
          <div>
            <label>Hour</label>
            <input type="number" min="0" max="23" />
          </div>

          <div>
            <label>Connection</label>
            <input type="text" />
          </div>
        </div>
      </main>
    </div>
  );
};
export default HRMSConfig;
