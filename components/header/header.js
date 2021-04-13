import React from "react";
import Logo from "../../public/images/logo.png";
import Shutdown from "../../public/images/shutdown.png";
import Docs from "../../public/images/docs.svg";

import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const router = useRouter();

  const handleShutdown = () => {
    // axios.get("http://34.65.51.37/Sun/GetConnectionString").then((res) => {
    //   console.log(res.data);
    // });
    router.push({
      pathname: `/shutdownDoc`,
    });
  };

  return (
    <header>
      <div className="container">
        <div>
          <img src={Logo} alt="logo" />
          <div>
            <Link href="http://34.65.51.37/swagger/index.html">
              <a>
                <img
                  src={Docs}
                  style={{ width: "30px", height: "30px" }}
                  alt="docs"
                />
              </a>
            </Link>
            <img
              src={Shutdown}
              className="shutdown"
              alt="shutdown"
              onClick={handleShutdown}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
