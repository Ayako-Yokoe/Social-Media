import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./LogoSearch.css";

const LogoSearch = () => {
  return (
    <div className="logoSearch">
      {/* replace with logo image */}
      <p>logo</p>
      <div className="search">
        <input type="text" placeholder="search..." />
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
