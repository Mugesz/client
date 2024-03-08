import React from "react";
import { useNavigate } from "react-router-dom";
import ViewAllData from "./ViewAllDatas";
import Header from "./Header";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="">
        {" "}
        <Header />
      </div>
      <div className=" margin-top">
        {" "}
        <ViewAllData />
      </div>
    </>
  );
};

export default Dashboard;
