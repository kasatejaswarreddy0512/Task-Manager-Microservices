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
    <div className="rounded-md bg-black p-5 flex item-center justity-between">
      <div className="space-y-2 ">
        <div className="flex item-center gap-2">
          <span>Git Hub : </span>
          <div className="flex item-center gap-2 text-[#c24dd0]">
            <OpenInNewIcon />
            <a href="/" target="_blank" rel="noopener noreferrer">
              Go To Link
            </a>
          </div>
        </div>
        <div className="flex item-center gap-2 mt-2 text-xs">
          <p>Submission time</p>
          <p className="text-gray-100">15:00:00</p>
        </div>
      </div>
      <div className=" ml-8 mt-2 gap-2">
        {true ? (
          <div className="flex gap-5 ">
            <div className="text-green-500 ">
              <IconButton
                color="success"
                onClick={() => {
                  handleAcceptOrDecline("ACCPETED");
                }}
              >
                <CheckIcon></CheckIcon>
              </IconButton>
            </div>
            <div className="text-red-500  ">
              <IconButton
                color="error"
                onClick={() => {
                  handleAcceptOrDecline("DECLINED");
                }}
              >
                <CloseIcon></CloseIcon>
              </IconButton>
            </div>
          </div>
        ) : (
          <Button
            color={true ? "success" : "error"}
            size="small"
            variant="outlined"
          >
            Accepted
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmissionCard;
