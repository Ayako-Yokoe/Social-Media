import React, { useContext, useState, useEffect } from "react"
import { followers } from "../FollowersData"
import "./FollowersCard.css"
import Context from "../../context"
import axios from "axios"

const FollowersCard = () => {
  const { setIsLoading, user } = useContext(Context)
  const [usersYouMayKnow, setUsersYouMayKnow] = useState([])

  console.log("usersYouMayKnow ", usersYouMayKnow)

  // toggleFollowerFunction

  const loadAllUsers = async () => {
    setIsLoading(true)
    axios.get("http://localhost:3001/api/user").then((res) => {
      setUsersYouMayKnow(res.data)
    })
    setIsLoading(false)
  }

  const handleFollowers = async () => {
    //const userId = user.id
    //
    // const usersYouMayKnowId = usersYouMayKnow.id
    if (!user.id || !usersYouMayKnow.id) {
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post("http://localhost:3001/api/followers", {
        follower_id: user.id,
        user_id: usersYouMayKnow.id,
      })
      setUsersYouMayKnow((prevUserYouMayKnow) => ({
        ...usersYouMayKnow,
        hasFollowed:
          response && response.data && response.data.message ? false : true,
      }))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAllUsers()
    handleFollowers()
  }, [setIsLoading, setUsersYouMayKnow])

  const removeFollow = async () => {
    return await axios.post("http://localhost:3001/api/followers/delete", {
      follower_id: user.id,
      user_id: usersYouMayKnow.id,
    })
  }

  const follow = async () => {
    return await axios.post("http://localhost:3001/api/followers/create", {
      follower_id: user.id,
      user_id: usersYouMayKnow.id,
    })
  }

  const updateNumberOfFollowers = async (numberOfFollowers) => {
    return await axios.post("http://localhost:3001/api/user/followers", {
      id: user.id,
      numberOfFollowers,
    })
  }

  const toggleFollowers = async (id) => {
    const userYouWantToFollow = usersYouMayKnow.filter((user) => user.id === id)

    console.log("userYouWantToFollow ", userYouWantToFollow)
    // try {
    //   if (usersYouMayKnow.hasFollowed) {
    //     await removeFollow()
    //     await updateNumberOfFollowers(
    //       usersYouMayKnow.number_of_followers
    //         ? usersYouMayKnow.number_of_followers - 1
    //         : 0
    //     )
    //   } else {
    //     await follow()
    //     await updateNumberOfFollowers(
    //       usersYouMayKnow.number_of_followers
    //         ? usersYouMayKnow.number_of_followers + 1
    //         : 1
    //     )
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return (
    <div className="followersCard">
      <h3>People You May Know</h3>
      {/* {followers.map((follower) => (
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
          </div> */}
      {usersYouMayKnow.map((follower) => (
        // delete the user who is logging in
        <div className="follower" key={follower.id}>
          <div>
            <img
              src={follower?.image}
              alt={follower.name}
              className="followerImg"
            />
            <div className="followerName">
              <span>@{follower.username}</span>
            </div>
          </div>
          <button
            className="button fc-button"
            //onClick={toggleFollowers(follower.id)}
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  )
}

export default FollowersCard
