

import React from "react";
import NavBar from "../component/NavBar"
import SideBar from "../component/SidebarAdmin";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="columns mt-6" style={{backgroundColor: "#505160", minHeight: "100vh" }}>
        <div className="column is-2"style={{ backgroundColor: "#505160", position: '',height: '100%', zIndex: '1' }}>
          <SideBar />
        </div>
        <div className="column has-background-light" >
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;