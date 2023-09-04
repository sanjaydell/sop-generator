import { Card, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import '../index.css'

function RadioButtonComponent({ title, value, placeholder, onChange }) {
  return (
    <div className="question-card">
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
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={onChange}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Card>
    </div>
  );
}

export default RadioButtonComponent;
