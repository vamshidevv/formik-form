import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Home";
import { HashLoader } from "react-spinners";

const Navbar = () => {
  const getData = useSelector((state) => state.form.formData);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <nav className="navContainer">
        <div className="home">
          <li>
            <NavLink to="/" className={"link1"}>
              Home
            </NavLink>
          </li>
        </div>
        <div className="Registration">
          <li>
            <NavLink to="/registration" className={"link2"}>
              Registration
            </NavLink>
          </li>
        </div>
      </nav>
      {isLoading ? (
        <div
          style={{
            position: "relative",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HashLoader color="#6193de" loading={isLoading} />
        </div>
      ) : (
        location.pathname === "/" && <Home retrieve={getData} />
      )}
      {getData.length === 0 && location.pathname === "/" && !isLoading && (
        <table border="1px">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Gender</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default Navbar;
