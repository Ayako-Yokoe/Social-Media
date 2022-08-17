import React, { useEffect, useContext, useState } from "react"
import "./ProfileCard.css"
import Context from "../../context"
import axios from "axios"

const ProfileCard = () => {
  const { setIsLoading, user } = useContext(Context)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // add async await, try catch
    setIsLoading(true)
    axios.get(`http://localhost:3001/api/user/${user.id}`).then((res) => {
      setCurrentUser(res.data)
    })
    setIsLoading(false)
  }, [setIsLoading, setCurrentUser])

  // response / currentUser[0] => change it
  console.log("user ", { currentUser })

  const ProfilePage = true
  return (
    <div className="profileCard">
      <div className="profileImages">
        {/* replace with images */}
        <p>background</p>
        <p>profile icon</p>
      </div>
      <div className="profileName">
        <span>{currentUser[0].username}</span>
        <span>Job Title</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>
              {currentUser[0].number_of_following
                ? currentUser.number_of_following
                : 0}
            </span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>
              {currentUser[0].number_of_followers
                ? currentUser.number_of_followers
                : 0}
            </span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {currentUser[0].number_of_posts
                    ? currentUser.number_of_posts
                    : 0}
                </span>
                <span> Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  )
}

export default ProfileCard