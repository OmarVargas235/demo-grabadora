import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactMediaRecorder = dynamic(
    () => import("react-media-recorder-2").then((mod) => mod.ReactMediaRecorder),
    {
        ssr: false,
    },
);

const STATUS = {
    idle: "idle",
    recording: "recording",
    acquiring_media: "acquiring_media",
    stopping: "stopping",
    stopped: "stopped",
};

function VideoPreview(props) {
    const { stream } = props;

    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    if (!stream) {
        return null;
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            Live Preview
            <video id="livePreview" ref={videoRef} width="390vw" autoPlay />
        </div>
    );
}

let isFirstCameraChange = true;

export default function Media() {
    const [selectedCamera, setSelectedCamera] = useState(true);
    const [isCameraChange, setIsCameraChange] = useState(false);

    const handleCameraChange = async (startRecording, stopRecording) => {
        setIsCameraChange(true);

        stopRecording();

        setSelectedCamera(!selectedCamera);

        startRecording();
    };

    const liveStreamWrapper = (previewStream, fn, status, startRecording, stopRecording) => {
        if (status !== "stopped") {
            window.setTimeout(() => {
                if (isCameraChange && isFirstCameraChange) {
                    isFirstCameraChange = false;
                    handleCameraChange(startRecording, stopRecording);
                }
            }, 0);

            return fn(previewStream);
        }

        return null;
    };

    const liveStream = (stream) => {
        const previewStream = stream;
        if (previewStream != null) {
            return <VideoPreview stream={previewStream} />;
        }

        return null;
    };

    return (
        <div>
            <ReactMediaRecorder
                video={{
                    facingMode: selectedCamera ? "user" : "environment",
                }}
                render={({
                    status,
                    startRecording,
                    stopRecording,
                    mediaBlobUrl,
                    previewStream,
                    clearBlobUrl,
                }) => (
                    <div className="flex flex-col mt-10 items-center h-screen">
                        <p>{status}</p>

                        <div className="flex justify-center items-center w-96 h-56 bg-slate-1 overflow-hidden">
                            {status === STATUS.idle && (
                                <button
                                    type="button"
                                    className="rounded-md bg-info-1 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-info-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info-1 mr-3"
                                    onClick={startRecording}
                                >
                                    Start Recording
                                </button>
                            )}

                            {(status === STATUS.acquiring_media ||
                                status === STATUS.stopping ||
                                (isCameraChange && status === STATUS.stopped)) && (
                                <p className="text-white">Cargando...</p>
                            )}

                            {status === STATUS.recording &&
                                liveStreamWrapper(
                                    previewStream,
                                    liveStream,
                                    status,
                                    startRecording,
                                    stopRecording,
                                )}

                            {status === STATUS.stopped && !isCameraChange && (
                                <video
                                    src={mediaBlobUrl}
                                    controls
                                    autoPlay
                                    loop
                                    className="w-full h-full bg-white"
                                    width={200}
                                    height={300}
                                />
                            )}
                        </div>

                        {status === STATUS.recording && (
                            <button
                                type="button"
                                className="rounded-md bg-info-1 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-info-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info-1 mt-4"
                                onClick={() => {
                                    stopRecording();
                                    setIsCameraChange(false);
                                }}
                            >
                                Stop Recording
                            </button>
                        )}

                        {status === STATUS.stopped && !isCameraChange && (
                            <div>
                                <button
                                    type="button"
                                    className="rounded-md bg-info-1 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-info-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info-1 mt-4"
                                    onClick={clearBlobUrl}
                                >
                                    Reset Recording
                                </button>

                                <a
                                    className="rounded-md bg-info-1 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-info-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info-1 mt-4 ml-4"
                                    download
                                    href={mediaBlobUrl}
                                >
                                    Download
                                </a>
                            </div>
                        )}

                        {status === STATUS.recording && (
                            <button
                                type="button"
                                className="rounded-md bg-info-1 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-info-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info-1 mt-4"
                                onClick={() => handleCameraChange(startRecording, stopRecording)}
                            >
                                Voltear Camera
                            </button>
                        )}
                    </div>
                )}
            />
        </div>
    );
}
