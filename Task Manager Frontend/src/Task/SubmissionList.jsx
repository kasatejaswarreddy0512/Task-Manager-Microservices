import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SubmissionCard from "./SubmissionCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#4c4a4aff",
  boxShadow: 25,
  p: 4,
  borderRadius: "10px",
};

const submissions = [1, 2, 3];

export default function SubmissionList({ handleClose, open }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {submissions.length > 0 ? (
              <div>
                {submissions.map((item, index) => (
                  <div key={index} className="mb-3">
                    <SubmissionCard />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-center font-bold">No Submission Found</div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
