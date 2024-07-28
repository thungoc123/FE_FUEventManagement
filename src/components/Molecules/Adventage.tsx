import React from 'react'

const Adventage = () => {
  return (
    <div style={{ width: "100%", border: "1px solid black", padding: "40px", display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "black" }}>
    <div style={{ color: "whitesmoke"}}>
      <h1 style={{ fontSize: "30px", marginBottom:"20px" }}>Welcome to the Call Capital page!</h1>
      <p>We are happy to meet you and hope you can find your favorite event to invest in</p>
      <p>Your satisfaction when using our services is our honor!</p>
    </div>
    <div style={{width:"400px", height:"400px", border:"1px solid white", borderRadius:"20px"}}>
      <img src="https://u3j7m9h7.rocketcdn.me/wp-content/uploads/2021/06/meme-stocks.jpg" alt="Event" style={{ width: "100%", height: "100%", borderRadius:"20px" }} />
    </div>
  </div>
  )
}

export default Adventage