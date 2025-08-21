import React from "react";
import Navigate from "./Navigate";
import { navigateMarketItems } from "@/constants/navigate.constant";
const MaketingHeader = () => {
  return (
    <div className="">
      <Navigate items={navigateMarketItems} />
    </div>
  );
};

export default MaketingHeader;
