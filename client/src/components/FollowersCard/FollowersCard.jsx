import React, { useContext, useState, useEffect, useCallback } from "react"
import { followers } from "../FollowersData"
import "./FollowersCard.css"
import Context from "../../context"
import axios from "axios"
import FollowUsers from "../FollowUsers/FollowUsers"

const FollowersCard = () => {
  const { setIsLoading, user } = useContext(Context)
  const [usersYouMayKnow, setUsersYouMayKnow] = useState([])
  //const [updatedFollowerInfo, setUpdatedFollowerInfo] = useState([])

  console.log("usersYouMayKnow parent ", usersYouMayKnow)

  let loadAllUsers = null
  let loadFollowers = null

  useEffect(() => {
    loadAllUsers()
  }, [loadAllUsers])

  useEffect(() => {
    loadFollowers()
  }, [loadFollowers, usersYouMayKnow, setUsersYouMayKnow])

  // loadAllUsers = useCallback(async () => {
  //   try {
  //     setIsLoading(true)
  //     const response = await axios.get("http://localhost:3001/user", {
  //       params: { _limit: 5 },
  //     })
  //     setUsersYouMayKnow(response.data)
  //     setIsLoading(false)
  //     await loadFollowers()
  //   } catch (err) {
  //     setIsLoading(false)
  //   }
  // })

  loadAllUsers = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("http://localhost:3001/user", {
        params: { _limit: 5 },
      })
      setUsersYouMayKnow(response.data)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  loadFollowers = useCallback(async (id) => {
    if (!id) return

    if (user.id && id) {
      try {
        setIsLoading(true)
        const response = await axios.post("http://localhost:3001/followers", {
          follower_id: user.id,
          person_id: id,
        })

        console.log("parent response ", response)

        let updatedUsersYouMayKnow = usersYouMayKnow.map((person) =>
          person.id === id
            ? {
                ...person,
                //hasFollowed: response && response.data.person_id ? false : true,
                hasFollowed: response && response.data.person_id ? true : false,
              }
            : person
        )

        console.log("updatedUsersYouMayKnow ", updatedUsersYouMayKnow)

        setUsersYouMayKnow(updatedUsersYouMayKnow)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  })

  // loadFollowers = useCallback(async (id) => {
  //   if (!id) return

  //   if (user.id && id) {
  //     try {
  //       setIsLoading(true)
  //       const response = await axios.post("http://localhost:3001/followers", {
  //         follower_id: user.id,
  //         person_id: id,
  //       })
  //       let updatedUsersYouMayKnow = usersYouMayKnow.map((person) =>
  //         person.id === id
  //           ? {
  //               ...person,
  //               hasFollowed: response && response.data.person_id ? false : true,
  //             }
  //           : person
  //       )
  //       setUsersYouMayKnow(updatedUsersYouMayKnow)
  //       setIsLoading(false)
  //     } catch (error) {
  //       console.log(error)
  //       setIsLoading(false)
  //     }
  //   }
  // })

  // const loadAllUsers = async () => {
  //   setIsLoading(true)
  //   axios.get("http://localhost:3001/user").then((res) => {
  //     setUsersYouMayKnow(res.data)
  //   })
  //   setIsLoading(false)
  // }

  // const loadFollowers = async (id) => {
  //   if (!id) return

  //   if (user.id && id) {
  //     try {
  //       setIsLoading(true)
  //       const response = await axios.post("http://localhost:3001/followers", {
  //         follower_id: user.id,
  //         person_id: id,
  //       })

  //       let updatedUsersYouMayKnow = usersYouMayKnow.map((person) =>
  //         person.id === id
  //           ? {
  //               ...person,
  //               hasFollowed: response && response.data.person_id ? false : true,
  //             }
  //           : person
  //       )

  //       setUsersYouMayKnow(updatedUsersYouMayKnow)
  //       setIsLoading(false)
  //     } catch (error) {
  //       console.log(error)
  //       setIsLoading(false)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   loadAllUsers()
  //   loadFollowers()
  // }, [setIsLoading, setUsersYouMayKnow])

  return (
    <div className="followersCard">
      <h3>People You May Know</h3>
      {usersYouMayKnow?.map((person) => {
        if (person.id !== user.id) {
          return (
            <FollowUsers
              person={person}
              key={person.id}
              loadFollowers={loadFollowers}
            />
          )
        }
      })}
    </div>
  )
}

export default FollowersCard
