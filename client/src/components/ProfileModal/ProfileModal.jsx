import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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
};

const ProfileModal = ({ modalOpen, setModalOpen }) => {
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="infoForm">
            <h3>Your Info</h3>
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstName"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastName"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Works At"
                className="infoInput"
                name="worksAt"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Lives In"
                className="infoInput"
                name="livesIn"
              />
              <input
                type="text"
                placeholder="Country"
                className="infoInput"
                name="country"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Job Status"
                className="infoInput"
                name="jobStatus"
              />
            </div>
            <div>
              Profile Image
              <input type="file" name="profileImage" />
              Cover Image
              <input type="file" name="coverImage" />
            </div>
            <button className="button info-button">Update</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
