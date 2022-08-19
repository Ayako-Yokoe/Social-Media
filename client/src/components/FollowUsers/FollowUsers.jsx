import React from "react"
import axios from "axios"

const FollowUsers = ({ person, user, usersYouMayKnow, setUsersYouMayKnow }) => {
  // hasFollowered

  const removeFollow = async () => {
    return await axios.post("http://localhost:3001/api/followers/delete", {
      follower_id: user.id,
      person_id: person.id,
    })
  }
  const follow = async () => {
    console.log("user_id ", person.id)

    return await axios.post("http://localhost:3001/api/followers/create", {
      follower_id: user.id,
      person_id: person.id,
    })
  }
  const updateNumberOfFollowers = async (numberOfFollowers) => {
    return await axios.post("http://localhost:3001/api/user/followers", {
      id: person.id,
      numberOfFollowers,
    })
  }
  const updateNumberOfFollowing = async (numberOfFollowing) => {
    return await axios.post("http://localhost:3001/api/user/following", {
      id: user.id,
      numberOfFollowing,
    })
  }

  const toggleFollowers = async () => {
    try {
      if (person.hasFollowed) {
        await removeFollow()
        await updateNumberOfFollowers(
          person.number_of_followers ? person.number_of_followers - 1 : 0
        )
        await updateNumberOfFollowing(
          user.number_of_following ? user.number_of_following - 1 : 0
        )
      } else {
        await follow()
        await updateNumberOfFollowers(
          person.number_of_followers ? person.number_of_followers + 1 : 1
        )
        await updateNumberOfFollowing(
          user.number_of_following ? user.number_of_following + 1 : 1
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="follower" key={person.id}>
        <div>
          <img src={person?.image} alt={person.name} className="followerImg" />
          <div className="followerName">
            <span>@{person.username}</span>
          </div>
        </div>
        <button className="button fc-button" onClick={toggleFollowers}>
          Follow
        </button>
      </div>
    </div>
  )
}

export default FollowUsers
