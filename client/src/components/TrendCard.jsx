import React from "react";
import "./TrendCard.css";
import { trendData } from "./TrendData";

const TrendCard = () => {
  return (
    <div className="trendCard">
      <h3>Trends for you</h3>
      {trendData.map((trend) => (
        <div className="trend" key={trend.id}>
          <span>#{trend.name}</span>
          <span>{trend.share}k shares</span>
        </div>
      ))}
    </div>
  );
};

export default TrendCard;
