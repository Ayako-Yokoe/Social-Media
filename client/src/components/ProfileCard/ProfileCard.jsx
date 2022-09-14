import React, { useEffect, useContext, useState } from "react"
import "./ProfileCard.css"
import Context from "../../context"
import axios from "axios"

const ProfileCard = () => {
  const { setIsLoading, user } = useContext(Context)
  const [userInfo, setUserInfo] = useState(null)

  const loadUserInfo = () => {
    setIsLoading(true)
    try {
      axios.get(`http://localhost:3001/api/user/${user.id}`).then((res) => {
        setUserInfo(res.data)
      })
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    loadUserInfo()
  }, [setIsLoading, userInfo, setUserInfo])

  const ProfilePage = true
  return (
    <div className="profileCard">
      <div className="profileImages">
        {/* replace with images */}
        <p>background</p>
        <p>profile icon</p>
      </div>
      <div className="profileName">
        <span>{userInfo?.username}</span>
        <span>Job Title</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>
              {userInfo?.number_of_following ? userInfo.number_of_following : 0}
            </span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>
              {userInfo?.number_of_followers ? userInfo.number_of_followers : 0}
            </span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {userInfo?.number_of_posts ? userInfo.number_of_posts : 0}
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
