import React, { useContext, useState, useEffect, useCallback } from "react"
import { followers } from "../FollowersData"
import "./FollowersCard.css"
import Context from "../../context"
import axios from "axios"
import FollowUsers from "../FollowUsers/FollowUsers"

// hasFollowed => db default false

const FollowersCard = () => {
  const { setIsLoading, user } = useContext(Context)
  const [usersYouMayKnow, setUsersYouMayKnow] = useState([])

  console.log("usersYouMayKnow ", usersYouMayKnow)

  const loadAllUsers = async () => {
    setIsLoading(true)
    axios.get("http://localhost:3001/api/user").then((res) => {
      setUsersYouMayKnow(res.data)
    })
    setIsLoading(false)
  }

  // const handleFollowers = async (id) => {
  //   if (!id) return
  //   const usersYouFollow = usersYouMayKnow.filter((ele) => ele.id === id)
  //   console.log("usersYouFollow ", usersYouFollow)

  //   if (!user.id || !usersYouFollow[0].id) {
  //     return
  //   }

  //   if (user.id && usersYouFollow[0].id) {
  //     try {
  //       setIsLoading(true)
  //       const response = await axios.post(
  //         "http://localhost:3001/api/followers",
  //         {
  //           follower_id: user.id,
  //           person_id: usersYouFollow[0].id,
  //         }
  //       )
  //       // setUsersYouMayKnow((prevUserYouMayKnow) => ({
  //       //   ...usersYouMayKnow,
  //       //   hasFollowed:
  //       //     response && response.data && response.data.message ? false : true,
  //       // }))

  //       // const clickFollowed = usersYouMayKnow.filter(
  //       //   (ele) => ele.id === response.person_id
  //       // )
  //       const newUsersYouMayKnow = usersYouMayKnow.map((ele) => {
  //         if (ele.id == response.data.person_id) {
  //           return {
  //             ...ele,
  //             hasFollowed:
  //               response && response.data && response.data.message
  //                 ? false
  //                 : true,
  //           }
  //         }

  //         return { ...ele }
  //       })

  //       console.log("newUsersYouMayKnow ", newUsersYouMayKnow)

  //       // setUsersYouMayKnow(newUsersYouMayKnow)
  //       setUsersYouMayKnow([...newUsersYouMayKnow])

  //       setIsLoading(false)
  //     } catch (error) {
  //       console.log(error)
  //       setIsLoading(false)
  //     }
  //   }
  // }

  useEffect(() => {
    loadAllUsers()
    //handleFollowers()
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
              // setIsLoading={setIsLoading}
              // user={user}
              usersYouMayKnow={usersYouMayKnow}
              setUsersYouMayKnow={setUsersYouMayKnow}
              //handleFollowers={handleFollowers}
            />
          )
        }
      })}
    </div>
  )
}

export default FollowersCard
