import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Button,
  IconButton,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { acceptDeclineSubmission } from "../Redux ToolKit/SubmissionSlice";

const SubmissionCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAcceptOrDecline = (status) => {
    dispatch(acceptDeclineSubmission({ id: item.id, status }));
  };

  console.log("Status:", item?.status);

  return (
    <Card
      sx={{
        background: "linear-gradient(to right, #600f0fff, #121212)",
        color: "#fff",
        borderRadius: 3,
        border: "1px solid #2c2c2c",
        boxShadow: 4,
        width: "400px",
        mb: 2,
        "&:hover": { boxShadow: 8 },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left side - Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* GitHub Link */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              GitHub:
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                color: "#3fe77fff",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#e16ef0")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#3fe77fff")}
            >
              <OpenInNewIcon fontSize="small" />
              <a
                href={item.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Go To Link
              </a>
            </div>
          </div>

          {/* Submission Time */}
          <Typography variant="body2" sx={{ color: "#bbb" }}>
            Submission time:{" "}
            <span style={{ color: "#fff" }}>{item.submissionTime}</span>
          </Typography>
        </div>

        {/* Right side - Actions */}
        <div>
          {item.status === "PENDING" ? (
            <div className="flex gap-5">
              <IconButton
                color="success"
                onClick={() => handleAcceptOrDecline("ACCEPTED")}
              >
                <CheckIcon className="text-green-500" />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => handleAcceptOrDecline("DECLINED")}
              >
                <CloseIcon className="text-red-500" />
              </IconButton>
            </div>
          ) : (
            <Button
              variant="outlined"
              color={item.status === "ACCEPTED" ? "success" : "error"}
              size="small"
              sx={{ fontWeight: "bold", borderRadius: 2 }}
            >
              {item.status}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;
