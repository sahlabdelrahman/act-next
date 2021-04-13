import React from "react";
import Link from "next/link";

const BreadCrumb = ({ path, page }) => {
  return (
    <div className="breadcrumb-lo">
      <Link href="/">
        <a className="first">Home</a>
      </Link>
      /
      <Link href={`/${path}`}>
        <a className="second">{page}</a>
      </Link>
    </div>
  );
};

export default BreadCrumb;
