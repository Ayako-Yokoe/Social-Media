import React from "react"
import ReactLoading from "react-loading"

const Loading = ({ type, color }) => {
  return (
    <div className="loading">
      <ReactLoading
        type="spinningBubbles"
        color="gray"
        height={100}
        width={100}
        className="spinner"
      />
    </div>
  )
}

export default Loading
