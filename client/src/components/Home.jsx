import React, { useState } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import { initialFormValue } from "../constants/initialForm";
import { Button } from "@mui/material";
import Education from "./Education";
import RadioButtonComponent from "./RadioButtonComponent";

function Home() {
  const [formData, setFormData] = useState(initialFormValue);
  console.log(formData);
  const changeFormData = (fieldName, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: value }));
  };

  function areAllFormFieldsFilled() {
    for (const key in formData) {
      if (key === "tutionFee" && formData["tutionPaid"] === "No") {
        continue;
      }
      if (key === "gicFees" && formData["gicDone"] === "No") {
        continue;
      }
      if (formData[key] === "") {
        return false;
      }
    }
    return true;
  }

  const submitForm = async () => {
    if (areAllFormFieldsFilled()) {
      fetch("http://127.0.0.1:8080/form")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((responseData) => {
          console.log(responseData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      alert("Please fill all the required fields");
    }
  };

  console.log("1111111111111111", formData);
  const {
    email,
    name,
    age,
    education,
    institute,
    course,
    workExperience,
    canadianInstitute,
    country,
    goals,
    listeningScores,
    readingScores,
    writingScores,
    speakingScores,
    tutionPaid,
    tutionFee,
    gicDone,
    gicFees,
  } = formData;
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <QuestionCard
          title="Email"
          value={email}
          onChange={(e) => changeFormData("email", e.target.value)}
        />
        <QuestionCard
          title="Full Name"
          value={name}
          onChange={(e) => changeFormData("name", e.target.value)}
        />
        <QuestionCard
          title="Age"
          value={age}
          onChange={(e) => changeFormData("age", e.target.value)}
        />
        <Education
          title="Highest Level of Education"
          value={education}
          onChange={(e) => changeFormData("education", e.target.value)}
        />
        <QuestionCard
          title="Institute where you completed your highest level of education"
          value={institute}
          onChange={(e) => changeFormData("institute", e.target.value)}
        />
        <QuestionCard
          title="What did you study"
          value={course}
          onChange={(e) => changeFormData("course", e.target.value)}
        />
        <QuestionCard
          title="Do you have any relevant work experience? "
          value={workExperience}
          onChange={(e) => changeFormData("workExperience", e.target.value)}
        />
        <QuestionCard
          title="What institute did you get admitted to in Canada?"
          value={canadianInstitute}
          onChange={(e) => changeFormData("canadianInstitute", e.target.value)}
        />
        <QuestionCard
          title="What is your program of study in Canada?"
          value=""
          onChange={(e) => changeFormData("programOfStudy", e.target.value)}
        />
        <QuestionCard
          title="Which country are you applying from?"
          value={country}
          onChange={(e) => changeFormData("country", e.target.value)}
        />
        <QuestionCard
          title="What are your future goals?"
          value={goals}
          onChange={(e) => changeFormData("goals", e.target.value)}
        />
        <QuestionCard
          title="English Scores - Listening"
          value={listeningScores}
          onChange={(e) => changeFormData("listeningScores", e.target.value)}
        />
        <QuestionCard
          title="English Scores - Reading"
          value={readingScores}
          onChange={(e) => changeFormData("readingScores", e.target.value)}
        />
        <QuestionCard
          title="English Scores - Speaking"
          value={speakingScores}
          onChange={(e) => changeFormData("speakingScores", e.target.value)}
        />
        <QuestionCard
          title="English Scores - Writing"
          value={writingScores}
          onChange={(e) => changeFormData("writingScores", e.target.value)}
        />
        <RadioButtonComponent
          title="Did you pay your first year tution?"
          value={tutionPaid}
          onChange={(e) => changeFormData("tutionPaid", e.target.value)}
        />
        {tutionPaid === "Yes" && (
          <QuestionCard
            title="How much tuition fee did you pay?"
            value={tutionFee}
            onChange={(e) => changeFormData("tutionFee", e.target.value)}
          />
        )}
        <RadioButtonComponent
          title="Did you do a GIC?"
          value={gicDone}
          onChange={(e) => changeFormData("gicDone", e.target.value)}
        />
        {gicDone === "Yes" && (
          <QuestionCard
            title="How much did you pay towards GIC?"
            value={gicFees}
            onChange={(e) => changeFormData("gicFees", e.target.value)}
          />
        )}
      </div>
      <Button
        variant="contained"
        sx={{ width: "6rem", marginBottom: "2rem" }}
        color="primary"
        onClick={submitForm}
      >
        Submit
      </Button>
    </>
  );
}

export default Home;
