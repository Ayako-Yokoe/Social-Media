import React, { useContext, useState, useEffect, useCallback } from "react"
import axios from "axios"
import Context from "../../context"

const FollowUsers = ({ person, loadFollowers, loadAllUsers }) => {
  const { setIsLoading, user } = useContext(Context)
  const [currentUser, setCurrentUser] = useState(null)

  console.log("currentUser child ", currentUser)

  let loadUserInfo = null

  loadUserInfo = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = axios.get(`http://localhost:3001/user/${user.id}`)

      console.log("child reponse ", response)

      if (response && response.data) {
        setCurrentUser(response)
      } else {
        setCurrentUser(person)
      }
      //setCurrentUser(response)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  })

  useEffect(() => {
    loadUserInfo()
  }, [setIsLoading, currentUser])

  // const loadUserInfo = () => {
  //   setIsLoading(true)
  //   try {
  //     //
  //     axios.get(`http://localhost:3001/user/${user.id}`).then((res) => {
  //       setCurrentUser(res.data)
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   setIsLoading(false)
  // }

  // // useCallback
  // useEffect(() => {
  //   loadUserInfo()
  //   //}, [setIsLoading, user, currentUser, setCurrentUser])
  // }, [])

  const removeFollow = async () => {
    return await axios.post("http://localhost:3001/followers/delete", {
      follower_id: user.id,
      person_id: person.id,
    })
  }
  const follow = async () => {
    return await axios.post("http://localhost:3001/followers/create", {
      follower_id: user.id,
      person_id: person.id,
    })
  }
  const updateNumberOfFollowers = async (numberOfFollowers) => {
    console.log("numberOfFollowers ", numberOfFollowers)

    return await axios.post("http://localhost:3001/user/followers", {
      id: person.id,
      numberOfFollowers,
    })
  }
  const updateNumberOfFollowing = async (numberOfFollowing) => {
    console.log("numberOfFollowing ", numberOfFollowing)
    return await axios.post("http://localhost:3001/user/following", {
      id: user.id,
      numberOfFollowing,
    })
  }

  const toggleFollowers = async () => {
    //await loadFollowers(person.id)
    await loadUserInfo()

    try {
      if (person.hasFollowed) {
        console.log("remove")
        await removeFollow()
        await updateNumberOfFollowers(
          person.number_of_followers ? person.number_of_followers - 1 : 0
          //(person.number_of_followers = 0)
        )
        await updateNumberOfFollowing(
          currentUser?.number_of_following
            ? currentUser?.number_of_following - 1
            : 0
          //(user.number_of_following = 0)
        )
      } else {
        console.log("follow")
        await follow()
        await updateNumberOfFollowers(
          person.number_of_followers ? person.number_of_followers + 1 : 1
          //(person.number_of_followers = 0)
        )
        await updateNumberOfFollowing(
          currentUser?.number_of_following
            ? currentUser?.number_of_following + 1
            : 1
          //(user.number_of_following = 0)
        )
      }
      //
      await loadFollowers(person.id)
      //
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
          {person.hasFollowed ? "Unfollow" : "Follow"}
          {/* {currentUser?.hasFollowed ? "Unfollow" : "Follow"} */}
        </button>
      </div>
    </div>
  )
}

export default FollowUsers
