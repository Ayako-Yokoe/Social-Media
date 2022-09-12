import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import Context from "../../context"

const FollowUsers = ({ person, usersYouMayKnow, setUsersYouMayKnow }) => {
  const { setIsLoading, user } = useContext(Context)
  const [currentUser, setCurrentUser] = useState(null)

  console.log("child usersYouMayKnow ", usersYouMayKnow)

  useEffect(() => {
    setIsLoading(true)
    try {
      axios.get(`http://localhost:3001/api/user/${user.id}`).then((res) => {
        setCurrentUser(res.data)
      })
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }, [setIsLoading, setCurrentUser])

  const removeFollow = async () => {
    return await axios.post("http://localhost:3001/api/followers/delete", {
      follower_id: user.id,
      person_id: person.id,
    })
  }
  const follow = async () => {
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

  //
  const handleFollowers = async (id) => {
    if (!id) return
    //const usersYouFollow = usersYouMayKnow.filter((ele) => ele.id === id)
    //console.log("usersYouFollow ", usersYouFollow)

    // if (!user.id || !usersYouFollow[0].id) {
    //   return
    // }

    //if (user.id && usersYouFollow[0].id) {
    if (user.id && id) {
      try {
        setIsLoading(true)
        const response = await axios.post(
          "http://localhost:3001/api/followers",
          {
            follower_id: user.id,
            person_id: id,
          }
        )

        // setUsersYouMayKnow((prevUserYouMayKnow) => ({
        //   ...prevUserYouMayKnow,
        //   hasFollowed:
        //     response && response.data && response.data.message ? false : true,
        // }))

        console.log("response ", response)
        console.log("response.data.person_id ", response.data.person_id)

        let temp = { ...usersYouMayKnow }

        console.log("temp1 ", temp)

        let isFollow = {
          ...usersYouMayKnow[response.data.person_id],
          hasFollowed: response.data.person_id ? false : true,
        }
        temp[response.data.person_id] = isFollow

        console.log("temp2 ", temp)

        // let temp = {
        //   ...usersYouMayKnow[id],
        //   hasFollowed:
        //     response && response.data && response.data.message ? false : true,
        // }

        // let newUsersYouMayKnow = {
        //   ...usersYouMayKnow,
        //   temp,
        // }

        // console.log("repsonse temp ", temp)
        // console.log("repsonse newUsersYouMayKnow ", newUsersYouMayKnow)

        // console.log("response usersYouMayKnow ", usersYouMayKnow)
        // setUsersYouMayKnow(usersYouMayKnow)

        // const clickFollowed = usersYouMayKnow.filter(
        //   (ele) => ele.id === response.person_id
        // )

        //console.log("response ", response)

        // const newUsersYouMayKnow = usersYouMayKnow.map((ele) => {
        //   if (ele.id == response.data.person_id) {
        //     console.log("if")
        //     return {
        //       ...ele,
        //       hasFollowed:
        //         response && response.data && response.data.message
        //           ? false
        //           : true,
        //     }
        //   } else {
        //     console.log("else")
        //     return { ...ele }
        //   }
        // })
        //console.log("newUsersYouMayKnow ", newUsersYouMayKnow)

        //setUsersYouMayKnow(newUsersYouMayKnow)
        //setUsersYouMayKnow([...newUsersYouMayKnow])

        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  }
  //

  const toggleFollowers = async () => {
    //console.log("toggleFollowers id ", person.id)
    await handleFollowers(person.id)
    //console.log("1")

    console.log("usersYouMayKnow toggle ", usersYouMayKnow)

    try {
      if (person.hasFollowed) {
        await removeFollow()
        await updateNumberOfFollowers(
          person.number_of_followers ? person.number_of_followers - 1 : 0
          //(person.number_of_followers = 0)
        )
        await updateNumberOfFollowing(
          currentUser.number_of_following == 1
            ? 0
            : user.number_of_following - 1
          //(user.number_of_following = 0)
        )
      } else {
        await follow()
        await updateNumberOfFollowers(
          person.number_of_followers ? person.number_of_followers + 1 : 1
          //(person.number_of_followers = 0)
        )
        await updateNumberOfFollowing(
          currentUser.number_of_following + 1
          //(user.number_of_following = 0)
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
