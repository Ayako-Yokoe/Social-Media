import React from "react"
import { followers } from "../FollowersData"
import "./FollowersCard.css"

const FollowersCard = () => {
  return (
    <div className="followersCard">
      <h3>Who is following you</h3>
      {followers.map((follower) => (
        <div className="follower" key={follower.id}>
          <div>
            <img
              src={follower.image}
              alt={follower.name}
              className="followerImg"
            />
            <div className="followerName">
              <span>{follower.name}</span>
              <span>@{follower.username}</span>
            </div>
          </div>
          <button className="button fc-button">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default FollowersCard
