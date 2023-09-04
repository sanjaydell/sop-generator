import { Card } from '@mui/material'
import React from 'react'
import '../index.css'

function Description() {
  return (
    <div className='question-card'>
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
        <h4 style={{ margin: 0, width: "fit-content" }}>
          Please fill all the details to custom generate your Statement of Purpose and get it to your mail.
        </h4>
      </Card>
    </div>
  )
}

export default Description