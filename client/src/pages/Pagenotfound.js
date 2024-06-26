import React from "react";
import Layout from "../component/La/Layout";
import { Link} from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout title={"Go Back-Page Not Found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">0ops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
