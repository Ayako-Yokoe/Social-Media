import React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import PostShare from "../../components/PostShare/PostShare"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const ShareModal = ({ modalOpen, setModalOpen }) => {
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PostShare />
        </Box>
      </Modal>
    </div>
  )
}

export default ShareModal
