import { Box, Card, TextField } from "@mui/material";
import React from "react";
import '../index.css'

function QuestionCard({ title, value, placeholder, onChange }) {
  return (
    <Box className="question-card">
      <Card
        elevation={3}
        display="flex"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "1rem",
        }}
      >
        <h3 style={{ margin: 0, width: "fit-content" }}>
          {title}
          <span style={{ color: "red" }}>*</span>
        </h3>
        <TextField
          id="standard-basic"
          label=""
          variant="standard"
          style={{ padding: "1rem 0" }}
          value={value}
          onChange={onChange}
        />
      </Card>
    </Box>
  );
}

export default QuestionCard;
