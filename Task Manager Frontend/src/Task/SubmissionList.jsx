import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SubmissionCard from "./SubmissionCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissionByTaskId } from "../Redux ToolKit/SubmissionSlice";
import { useLocation } from "react-router-dom";

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

export default function SubmissionList({ handleClose, open }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");

  // ✅ Correct slice selector
  const { submissions = [] } = useSelector((store) => store.submission || {});

  React.useEffect(() => {
    if (taskId) {
      console.log("Fetching submissions for taskId:", taskId);
      dispatch(fetchSubmissionByTaskId({ taskId }));
    }
  }, [dispatch, taskId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          {submissions.length > 0 ? (
            <div className="space-y-2">
              {submissions.map((item, index) => (
                <SubmissionCard key={index} item={item} />
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
  );
}
