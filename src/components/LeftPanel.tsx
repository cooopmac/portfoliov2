import logo from "../assets/profile.png";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import { useState, useEffect } from "react";
import threeDLogo from "../assets/3dlogo.png";
import threeDLogo2 from "../assets/star3d.png";
import { GlowingEffect } from "./ui/glowing-effect";

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
    name: string;
  };
}

const setStatusColour = () => {
  const date = new Date();
  const time = date.getHours();

  if (time >= 9 && time <= 17) {
    return "bg-green-400";
  } else {
    return "bg-red-400";
  }
};

const setStatusText = () => {
  const statusText = ["probably working.", "probably sleeping."];
  const date = new Date();
  const time = date.getHours();

  if (time >= 9 && time <= 17) {
    return statusText[0];
  } else {
    return statusText[1];
  }
};

const LeftPanel = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<SpotifyTrack | null>(
    null
  );

  const fetchCurrentlyPlaying = async () => {
    try {
      const response = await axios.get("/api/currently-playing");
      if (response.data && response.data.item) {
        setCurrentlyPlaying(response.data.item);
      }
    } catch (error) {
      console.error("Error fetching currently playing track");
    }
  };

  useEffect(() => {
    fetchCurrentlyPlaying();
    // Update every 30 seconds
    const interval = setInterval(fetchCurrentlyPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full lg:w-1/3 flex flex-col border-b lg:border-b-0 lg:border-r border-neutral-800 panel-height lg:overflow-y-auto overflow-y-auto lg:min-h-[calc(100vh-3rem)]">
      <div className="flex border-b border-neutral-800 space-x-4 items-center p-4">
        <div className="relative">
          <img
            src={logo}
            alt="Cooper MacGregor"
            className="w-30 h-30 rounded-full object-cover"
          />
          <span
            className={`absolute bottom-1 right-0 w-8 h-8 ${setStatusColour()} rounded-full border-3 border-neutral-900`}
          ></span>
        </div>
        <div>
          <div className="text-3xl">Cooper MacGregor</div>
          <div className="py-2 text-md text-neutral-500 items-center font-pixel">
            {setStatusText()}
          </div>
        </div>
      </div>
      <div className="flex border-b border-neutral-800 p-4 gap-4">
        <div className="relative flex-1 flex flex-row justify-between h-20 border border-neutral-800 rounded-lg p-1 pr-2 pl-2 py-2 gap-2">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <div className="flex flex-col justify-center">
            <div className="text-neutral-500 truncate text-sm font-pixel">
              listening to:
            </div>
            {currentlyPlaying ? (
              <>
                <div className="flex text-sm truncate overflow-hidden whitespace-nowrap max-w-xs">
                  {currentlyPlaying.name}
                </div>
                <div className="flex text-xs text-neutral-400">
                  {currentlyPlaying.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                </div>
              </>
            ) : (
              <div className="flex items-center text-neutral-500 font-pixel text-sm">
                offline 🦗
              </div>
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
        <div className="relative flex-1 flex h-20 border border-neutral-800 rounded-lg">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <div className="flex flex-col pl-2 py-1">
            <div className="font-pixel text-neutral-500 text-sm">
              contact me:
            </div>
            <div className="text-sm">cooper.macgregor14@gmail.com</div>
            <div className="pt-2 flex flex-row gap-4">
              <a
                href="https://www.linkedin.com/in/cooper-macgregor"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-lg hover:text-neutral-500 cursor-pointer transition duration-200" />
              </a>
              <a
                href="https://github.com/cooopmac"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-lg hover:text-neutral-500 cursor-pointer transition duration-200" />
              </a>
              <a
                href="https://x.com/coopmacg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="text-lg hover:text-neutral-500 cursor-pointer transition duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-neutral-800 flex p-4">
        <div className="font-pixel text-neutral-500">
          Gym-rat, coder, and wannabe golfer on the weekends. I'm a new grad CS
          student who likes building cool apps and solving problems with clean
          code. I've built AI-powered tools, full-stack platforms, and a C-
          compiler just for fun (well... and grades). Off-screen, I'm into the
          gym, cars, friends, family time, and making every day a good time. I
          believe in working hard, lifting heavy, and always learning something
          new.
        </div>
      </div>
      <div className="flex border-b border-neutral-800 justify-between bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950">
        <div className="flex-1 group perspective-1000">
          <img
            src={threeDLogo}
            alt="3D Logo"
            className="w-64 h-64 object-contain rounded transition-transform duration-500 group-hover:rotate-y-24 group-hover:rotate-x-12"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.5s",
            }}
          />
        </div>
        <div className="flex-1 group perspective-1000">
          <img
            src={threeDLogo2}
            alt="3D Logo"
            className="w-64 h-64 object-contain rounded transition-transform duration-500 group-hover:rotate-y-48 group-hover:rotate-x-48"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.5s",
            }}
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900/50 rounded-lg p-6 border border-dashed border-neutral-800 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold font-pixel text-neutral-500">
            coming soon...
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
