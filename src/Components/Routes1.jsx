import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import FormComponent from "./FormComponent";

const Routes1 = () => {
  return (
    <div>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/registration" Component={FormComponent} />
      </Routes>
    </div>
  );
};

export default Routes1;
