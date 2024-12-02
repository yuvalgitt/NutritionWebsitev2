import React from "react";
import "../../styles/styles.css";
import ProfileStatsComp from "./ProfileStatsComp";
import ProfileGraphComp from "./ProfileGraphComp";
import "../../styles/styles.css";

const DashboardModuleComp = () => {
  return (
    <div
      className="module-invisible"
      style={{
        flexDirection: "column",
        height :'97.3%'
      }}
    >
      <ProfileStatsComp></ProfileStatsComp>
      <ProfileGraphComp></ProfileGraphComp>
    </div>
  );
};

export default DashboardModuleComp;
