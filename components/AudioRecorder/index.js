import React from "react";
import dynamic from "next/dynamic";
import { MicrophoneIcon } from "@heroicons/react/20/solid";

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

function AudioPreview() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <MicrophoneIcon className="w-20 h-20 text-white" />
        </div>
    );
}

export default function Media() {
    return (
        <div>
            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl }) => (
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

                            {(status === STATUS.acquiring_media || status === STATUS.stopping) && (
                                <p className="text-white">Cargando...</p>
                            )}

                            {status === STATUS.recording && <AudioPreview />}

                            {status === STATUS.stopped && (
                                <audio
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
                                onClick={stopRecording}
                            >
                                Stop Recording
                            </button>
                        )}

                        {status === STATUS.stopped && (
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
                    </div>
                )}
            />
        </div>
    );
}
