import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const SubmissionCard = () => {
  const handleAcceptOrDecline = (status) => {
    console.log(status);
  };

  return (
    <div className="rounded-md bg-black p-4 flex items-center justify-between shadow-md mb-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Git Hub :</span>
          <div className="flex items-center gap-2 text-[#c24dd0]">
            <OpenInNewIcon fontSize="small" />
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Go To Link
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-300">
          <p>Submission time</p>
          <p className="text-gray-100">15:00:00</p>
        </div>
      </div>

      <div className="ml-8 mt-2 gap-2">
        {true ? (
          <div className="flex gap-3">
            <IconButton
              color="success"
              onClick={() => handleAcceptOrDecline("ACCEPTED")}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleAcceptOrDecline("DECLINED")}
            >
              <CloseIcon />
            </IconButton>
          </div>
        ) : (
          <Button color="success" size="small" variant="outlined">
            Accepted
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmissionCard;
