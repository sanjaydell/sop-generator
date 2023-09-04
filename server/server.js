import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import bodyParser from "body-parser";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyB4JjPEBfJwv3T-I2w281QMmE3AejNCoGA",
  authDomain: "sop-generator-c2c2b.firebaseapp.com",
  projectId: "sop-generator-c2c2b",
  storageBucket: "sop-generator-c2c2b.appspot.com",
  messagingSenderId: "869670330151",
  appId: "1:869670330151:web:ab49ecb31de8e973891302",
  measurementId: "G-N0Z56KFSC9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_TOKEN, // This is also the default, can be omitted
});

const app = express();
app.use("/", express.static("public"));
app.use(cors());
app.use(express.json());

app.post("/form", async (req, res) => {
  // console.log(req.body);
  // const responseData = { message: 'Data received successfully' };

  // res.json(responseData);
  try {
    // Call the OpenAI API to generate text
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `my name is ${req.body.name} I am from ${req.body.country}. genearte a statement of purpose to the visa officer as I got admission for post graduation computers course in ${req.body.university} in canada. give me only the body without any salutations`,
      max_tokens: 2048,
      temperature: 1,
    });

    const generatedText = response.choices[0].text;

    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream("StatementOfPurpose.pdf"));
    pdfDoc.text(
      `From\n${req.body.name}\n${req.body.country}\n${req.body.email}\n\n\nTo\nVisa Officer\nHigh Commission of Canada\nSubject: Statement of Purpose for studying in Canada\n\n\n${generatedText}\n\n\nThanks & Regards\n${req.body.name}`
    );

    pdfDoc.end();

    // Email configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMIAL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: req.body.email,
      subject: "Statement of purpose",
      text: `Here is the PDF file you requested.\n\n\n Here are the details that you have subitted.\n\n `,
      html: `
    <html>
      <body>
      <h4>The below are the details entered</h4>
      <table>
      <tr>
      <td>Email:</td>
      <td>${req.body.email}</td>
      </tr>
      <tr>
      <td>Name:</td>
      <td>${req.body.name}</td>
      </tr>
      <tr>
      <td>Age:</td>
      <td>${req.body.age}</td>
      </tr><tr>
      <td>Education:</td>
      <td>${req.body.education}</td>
      </tr><tr>
      <td>Institute:</td>
      <td>${req.body.institute}</td>
      </tr><tr>
      <td>Course:</td>
      <td>${req.body.course}</td>
      </tr><tr>
      <td>Work Experience</td>
      <td>${req.body.workExperience}</td>
      </tr><tr>
      <td>Institute in Canada:</td>
      <td>${req.body.canadianInstitute}</td>
      </tr><tr>
      <td>Program of study:</td>
      <td>${req.body.programOfStudy}</td>
      </tr><tr>
      <td>Country:</td>
      <td>${req.body.country}</td>
      </tr><tr>
      <td>Goals:</td>
      <td>${req.body.goals}</td>
      </tr><tr>
      <td>Listening Scores:</td>
      <td>${req.body.listeningScores}</td>
      </tr><tr>
      <td>Reading Scores:</td>
      <td>${req.body.readingScores}</td>
      </tr><tr>
      <td>Writing Scores:</td>
      <td>${req.body.writingScores}</td>
      </tr><tr>
      <td>Speaking Scores</td>
      <td>${req.body.speakingScores}</td>
      </tr><tr>
      <td>Is tution Paid:</td>
      <td>${req.body.tutionPaid}</td>
      </tr><tr>
      <td>Tution fee:</td>
      <td>${req.body.tutionFee}</td>
      </tr>
      <tr>
      <td>Is GIC done:</td>
      <td>${req.body.gicDone}</td>
      </tr><tr>
      <td>GIC fee:</td>
      <td>${req.body.gicFees}</td>
      </tr>
      </table>
      </body>
    </html>
  `,
      attachments: [
        {
          filename: "StatementOfPurpose.pdf",
          path: "StatementOfPurpose.pdf", // Path to the PDF file you generated
        },
      ],
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await setDoc(doc(db, "form", `${Math.floor(Math.random() * (200000 - 1 + 1)) + 1}`), req.body);

    res.status(200).send("Data received successfully");
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).send("Error generating text");
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  // console.log(`Server is running on PORT ${PORT}`);
});
