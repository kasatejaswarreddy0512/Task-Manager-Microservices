import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Button,
  IconButton,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { acceptDeclineSubmission } from "../Redux ToolKit/SubmissionSlice";

const SubmissionCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAcceptOrDecline = (status) => {
    dispatch(acceptDeclineSubmission({ id: item.id, status }));
    // .unwrap()
    // .then(() => dispatch(getAllSubmissions())); // refresh list after update
  };

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
        <Stack spacing={1}>
          {/* GitHub Link */}
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              GitHub:
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{
                color: "#c24dd0",
                cursor: "pointer",
                "&:hover": { color: "#e16ef0" },
              }}
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
            </Box>
          </Box>

          {/* Submission Time */}
          <Typography variant="body2" sx={{ color: "#bbb" }}>
            Submission time:{" "}
            <span style={{ color: "#fff" }}>{item.submissionTime}</span>
          </Typography>
        </Stack>

        {/* Right side - Actions */}
        <Box>
          {item.status === "PENDING" ? (
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => handleAcceptOrDecline("ACCEPTED")}
                sx={{
                  color: "green",
                  "&:hover": { transform: "scale(1.1)" },
                  transition: "0.2s",
                }}
              >
                <CheckIcon sx={{ fontSize: 40, color: "lime" }} />
              </IconButton>
              <IconButton
                onClick={() => handleAcceptOrDecline("DECLINED")}
                sx={{
                  color: "red",
                  "&:hover": { transform: "scale(1.1)" },
                  transition: "0.2s",
                }}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </Stack>
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;
