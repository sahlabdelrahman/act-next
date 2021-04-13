import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SideNav = () => {
  const router = useRouter();
  return (
    <div className="sidenav">
      <div className="container">
        <Link href="/">
          <a className={`${router.pathname == "/" ? "active" : ""}`}>Home</a>
        </Link>
        <Link href="/logs">
          <a className={`${router.pathname == "/logs" ? "active" : ""}`}>
            Logs
          </a>
        </Link>
        <Link href="/manualExecute">
          <a
            className={`${router.pathname == "/manualExecute" ? "active" : ""}`}
          >
            Manual Execute
          </a>
        </Link>
        <Link href="/sunConfig">
          <a
            className={`${
              router.pathname == "/sunConfig" ||
              router.pathname == "/sunDetailConfig" ||
              router.pathname == "/sunHDRConfig" ||
              router.pathname == "/sunIsDone"
                ? "active"
                : ""
            }`}
          >
            Sun Configration
          </a>
        </Link>
        <Link href="/operaConfig">
          <a
            className={`${
              router.pathname == "/operaConfig" ||
              router.pathname == "/operaReportConfig" ||
              router.pathname == "/operaIsDone"
                ? "active"
                : ""
            }`}
          >
            Opera Configration
          </a>
        </Link>
        <Link href="/hrmsConfig">
          <a
            className={`${
              router.pathname == "/hrmsConfig" ||
              router.pathname == "/hrmsReportConfig" ||
              router.pathname == "/hrmsIsDone"
                ? "active"
                : ""
            }`}
          >
            HRMS Configration
          </a>
        </Link>
        <Link href="/mappingOperaToSunDetail">
          <a
            className={`${
              router.pathname == "/mappingOperaToSunDetail" ? "active" : ""
            }`}
          >
            Mapping Opera to sun Detail
          </a>
        </Link>
        <Link href="/mappingOperaToSunHDR">
          <a
            className={`${
              router.pathname == "/mappingOperaToSunHDR" ? "active" : ""
            }`}
          >
            Mapping Opera to sun HDR
          </a>
        </Link>
        <Link href="/mappingHRMSToSunDetail">
          <a
            className={`${
              router.pathname == "/mappingHRMSToSunDetail" ? "active" : ""
            }`}
          >
            Mapping HRMS to sun Detail
          </a>
        </Link>
        <Link href="/mappingHRMSToSunHDR">
          <a
            className={`${
              router.pathname == "/mappingHRMSToSunHDR" ? "active" : ""
            }`}
          >
            Mapping HRMS to sun HDR
          </a>
        </Link>
        <Link href="/executionHistory">
          <a
            className={`${
              router.pathname == "/executionHistory" ? "active" : ""
            }`}
          >
            Execution History
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
