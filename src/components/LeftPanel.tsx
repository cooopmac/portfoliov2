import logo from "../assets/profile.png";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import { useState, useEffect } from "react";

interface SpotifyTrack {
  name: string; 
  artists: { name: string }[]; 
  album: {
    images: { url: string }[];
    name: string;
  };
}

const setStatusColour = () => {
  const date = new Date()
  const time = date.getHours()

  if (time >=9 && time <= 17) {
    return "bg-green-400"
  } else {
    return "bg-red-400"
  }
}

const setStatusText = () => {
  const statusText = ["probably working.", "probably sleeping."]
  const date = new Date()
  const time = date.getHours()

  if (time >=9 && time <= 17) {
    return statusText[0]
  } else {
    return statusText[1]
  }
}

const LeftPanel = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<SpotifyTrack | null>(null);

  const fetchCurrentlyPlaying = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/currently-playing");
      if (response.data && response.data.item) {
        setCurrentlyPlaying(response.data.item);
      }
    } catch (error) {
      console.error("Error fetching currently playing track:", error);
    }
  };

  useEffect(() => {
    fetchCurrentlyPlaying();
    // Update every 30 seconds
    const interval = setInterval(fetchCurrentlyPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 border-r border-neutral-800">
      <div className="flex border-b border-neutral-800 space-x-4 items-center p-4">
        <div className="relative">
          <img src={logo} alt="Cooper MacGregor" className="w-30 h-30 rounded-full object-cover"/>
          <span className={`absolute bottom-1 right-0 w-8 h-8 ${setStatusColour()} rounded-full border-3 border-neutral-900`}></span>
        </div>
        <div>
          <div className="text-3xl">Cooper MacGregor</div>
          <div className="py-2 text-md text-neutral-500 items-center font-pixel">{setStatusText()}</div>
        </div>
      </div>
      <div className="flex border-b border-neutral-800 p-4 gap-4">
        <div className="flex-1 flex flex-row h-20 border border-neutral-800 rounded-lg p-1 pl-2 py-2 gap-2">
          <div className="flex flex-col justify-center">
            <div className="text-neutral-500 truncate text-sm font-pixel">listening to:</div>
            {currentlyPlaying ? (
              <>
                <div className="flex text-sm truncate overflow-hidden whitespace-nowrap max-w-xs">{currentlyPlaying.name}</div>
                <div className="flex text-xs text-neutral-400 pt-1">
                  {currentlyPlaying.artists.map((artist) => artist.name).join(", ")}
                </div>
              </>
            ) : (
              <div className="flex items-center text-neutral-500 font-pixel text-sm">offline 🦗</div>
            )}
          </div>
          {currentlyPlaying && currentlyPlaying.album.images[0] && (
            <div className="aspect-square h-full">
              <img 
                src={currentlyPlaying.album.images[0].url} 
                alt={currentlyPlaying.album.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
          )}
        </div>
        <div className="flex-1 flex h-20 border border-neutral-800 rounded-lg">
          <div className="flex flex-col pl-2 py-1">
            <div className="font-pixel text-neutral-500 text-sm">contact me:</div>
            <div className="text-sm">cooper.macgregor@gmail.com</div>
            <div className="pt-2 flex flex-row gap-4">
              <a href="https://www.linkedin.com/in/cooper-macgregor" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-lg hover:text-neutral-500 cursor-pointer transition duration-200"/>
              </a>
              <a href="https://github.com/cooopmac" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-lg hover:text-neutral-500 cursor-pointer transition duration-200"/>
              </a>
              <a href="https://x.com/coopmacg" target="_blank" rel="noopener noreferrer">
                <FaXTwitter className="text-lg hover:text-neutral-500 cursor-pointer transition duration-200"/>
              </a>
            </div>
          </div>
        </div>     
    
      </div>
    </div>
  )
}

export default LeftPanel