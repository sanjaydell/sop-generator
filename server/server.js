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
app.use(cors());

app.get("/form", async (req, res) => {
  try {
    // Call the OpenAI API to generate text
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt:
        "my name is sanjay anuchuri, I am from india. genearte a statement of purpose to the visa officer as I got admission for post graduation computers course in university of toronto in canada. give me only the body without any salutations",
      max_tokens: 2048,
      temperature: 1,
    });

    const generatedText = response.choices[0].text;

    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream("example.pdf"));
    pdfDoc.text(generatedText);

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
      to: process.env.MY_EMAIL,
      subject: "Statement of purpose",
      text: "Here is the PDF file you requested.",
      attachments: [
        {
          filename: "example.pdf",
          path: "example.pdf", // Path to the PDF file you generated
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

    // await setDoc(doc(db, "form"), req.body);

    res.status(200).send("Data received successfully");
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).send("Error generating text");
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
