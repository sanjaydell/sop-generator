import { Card, Input, MenuItem, Select } from "@mui/material";
import React from "react";

function Education({ title, value, placeholder, onChange }) {
  return (
    <div style={{ width: "75%", margin: "auto", padding: "1rem" }}>
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
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label=""
          onChange={onChange}
          sx={{ margin: "1rem 0", width: "26rem" }}
          placeholder="Choose an option"
          displayEmpty
          renderValue={value !== "" ? undefined : () => "Choose an option"}
        >
          <MenuItem value="Grade 12">Grade 12</MenuItem>
          <MenuItem value="Diploma">Diploma</MenuItem>
          <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
          <MenuItem value="Master's Degree">Master's Degree</MenuItem>
          <MenuItem value="PHD">PHD</MenuItem>
        </Select>
      </Card>
    </div>
  );
}

export default Education;
