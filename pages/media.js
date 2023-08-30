import React, { useState } from "react";

import VideoRecorder from "../components/VideoRecorder/index.js";
import AudioRecorder from "../components/AudioRecorder";

export default function Media() {
    const [isVideo, setIsVideo] = useState(true);

    return (
        <div className="flex flex-col items-center">
            <div className="flex">
                <button
                    type="button"
                    className={`rounded-md px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-success-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-1 mt-4 mr-3 ${
                        isVideo ? "bg-success-3" : "bg-success-1"
                    }`}
                    onClick={() => setIsVideo(true)}
                >
                    Video
                </button>

                <button
                    type="button"
                    className={`rounded-md px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-success-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-1 mt-4 ${
                        isVideo ? "bg-success-1" : "bg-success-3"
                    }`}
                    onClick={() => setIsVideo(false)}
                >
                    Audio
                </button>
            </div>

            {isVideo ? <VideoRecorder /> : <AudioRecorder />}
        </div>
    );
}
