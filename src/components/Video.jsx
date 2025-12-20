import React from 'react'
import bgVideo from "../assets/bgVideo.mp4"
export default function Video() {
  return (
    <div className='background-video'>
        <video src={bgVideo} autoPlay loop muted></video>
    </div>
  )
}
