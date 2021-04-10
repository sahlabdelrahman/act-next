import React from "react";
import Head from "next/head";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        {/* switch between pages */}
        <div>
          <button>
            <Link href="/">
              <a>Home</a>
            </Link>
          </button>
          <button>
            <Link href="/logs">
              <a>Logs</a>
            </Link>
          </button>
          <button>
            <Link href="/manualExecute">
              <a>Manual Execute</a>
            </Link>
          </button>
          <button>
            <Link href="/sunConfig">
              <a>Sun Config</a>
            </Link>
          </button>
          <button>
            <Link href="/operaConfig">
              <a>Opera Config</a>
            </Link>
          </button>
          <button>
            <Link href="/hrmsConfig">
              <a>HRMS Config</a>
            </Link>
          </button>
          <button>
            <Link href="/mappingOperaToSunDetail">
              <a>Mapping Opera to sun Detail</a>
            </Link>
          </button>
          <button>
            <Link href="/mappingOperaToSunHDR">
              <a>Mapping Opera to sun HDR</a>
            </Link>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
