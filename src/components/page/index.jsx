import React ,{ useEffect } from 'react';
import '../../assets/styles/page.scss'
const ws = new WebSocket('ws://be.uat.opencapital.com:3143');
import logo from  '../../assets/images/oca_short_logo.png'

import { useState } from "react"

const emotions = [
  { value: 'very-sad', emoji: '😢' },
  { value: 'sad', emoji: '😔' },
  { value: 'neutral', emoji: '😐' },
  { value: 'happy', emoji: '🙂' },
  { value: 'very-happy', emoji: '🥰' },
]
const Page = ()=>{

    const onSendData = ()=>{
        setComment( t=>{
            return ''
        })
    
        if ( ws.readyState === WebSocket.OPEN) {
            ws.send(comment);
            // setComment('')
            // setSelectedFeeling('Medium')
          }
      }
      const onSendEmoji = (feeling)=>{
        if ( ws.readyState === WebSocket.OPEN) {
            ws.send(feeling);
            // setComment('')
            // setSelectedFeeling('Medium')
          }
      }

  const [selectedFeeling, setSelectedFeeling] = useState("Medium");
  const [comment, setComment] = useState("");

  const handleFeelingChange = (feeling) => {
    setSelectedFeeling(feeling);
    onSendEmoji(feeling)
  };

  const handleSubmit = () => {
    // alert(`Feedback: ${selectedFeeling}, Comment: ${comment}`);
    onSendData()
    

  };

  return (
    <div
      className='page'
    >
        <div className='container'>
            <img src={logo} style={{
                height:'80px'
            }}/>
        <br/>
        <h3 style={{ marginBottom: "10px" }}>Merry Christmas!!</h3>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Share you favorite highlight for this year :
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
        {[
          { feeling: "confeti", emoji: "🎉" },
          { feeling: "Very Bad", emoji: "😟" },
          { feeling: "boost", emoji: "🚀" },
          { feeling: "Medium", emoji: "😐" },
          { feeling: "Good", emoji: "🙂" },
          { feeling: "Very Good", emoji: "😂" },
          { feeling: "love", emoji: "🥰" },
        ].map(({ feeling, emoji }) => (
          <div
            key={feeling}
            onClick={() => handleFeelingChange(feeling)}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              width:'30px',
              height:'30px',
              borderRadius: "100%",
              display:'flex',
              justifyContent:'center', 
              alignItems:'center',
              
            //   background: selectedFeeling === feeling ? "#e0f7fa" : "transparent",
            //   boxShadow: selectedFeeling === feeling ? "0 0 5px rgba(0, 0, 0, 0.2)" : "none",
            border: selectedFeeling == feeling ? '1px solid grey': 'none'
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <textarea
        placeholder="Add a Comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{
          width: "93%",
          height: "80px",
          padding: "10px",
          border: "1px solid #ddd",
          backgroundColor:"white",
          borderRadius: "5px",
          color:'black',
          marginBottom: "20px",
          fontSize: "14px",
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "10px",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Submit Now
      </button>
    </div>
    </div>
  );
};

export default Page
