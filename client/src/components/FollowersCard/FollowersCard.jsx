import React, { useContext, useState, useEffect } from "react"
import { followers } from "../FollowersData"
import "./FollowersCard.css"
import Context from "../../context"
import axios from "axios"
import FollowUsers from "../FollowUsers/FollowUsers"

const FollowersCard = () => {
  const { setIsLoading, user } = useContext(Context)
  const [usersYouMayKnow, setUsersYouMayKnow] = useState([])

  // is there hasFollowed?
  console.log("usersYouMayKnow ", usersYouMayKnow)

  const loadAllUsers = async () => {
    setIsLoading(true)
    axios.get("http://localhost:3001/api/user").then((res) => {
      setUsersYouMayKnow(res.data)
    })
    setIsLoading(false)
  }

  const handleFollowers = async () => {
    if (!user.id || !usersYouMayKnow.id) {
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post("http://localhost:3001/api/followers", {
        follower_id: user.id,
        person_id: usersYouMayKnow.id,
      })
      setUsersYouMayKnow((prevUserYouMayKnow) => ({
        ...usersYouMayKnow,
        hasFollowed:
          response && response.data && response.data.message ? false : true,
      }))

      console.log("hasFollowed ", usersYouMayKnow)

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

  return (
    <div className="followersCard">
      <h3>People You May Know</h3>
      {usersYouMayKnow.map((person) => {
        if (person.id !== user.id) {
          return (
            <FollowUsers
              person={person}
              key={person.id}
              user={user}
              usersYouMayKnow={usersYouMayKnow}
              setUsersYouMayKnow={setUsersYouMayKnow}
            />
          )
        }
      })}
    </div>
  )
}

export default FollowersCard
