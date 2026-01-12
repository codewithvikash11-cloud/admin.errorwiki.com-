"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Camera, Video, StopCircle, Download, Monitor, AlertCircle, RefreshCw } from 'lucide-react';

export default function CameraRecorder() {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
    const [countdown, setCountdown] = useState(0);

    const startCamera = async () => {
        try {
            setError(null);
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError("Could not access camera/microphone. Please ensure you have granted permissions.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            if (videoRef.current) videoRef.current.srcObject = null;
        }
    };

    useEffect(() => {
        return () => stopCamera();
    }, []);

    const startRecording = () => {
        if (!stream) return;

        setRecordedChunks([]);
        setPreviewUrl(null);

        // Simple countdown
        setCountdown(3);
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    beginMediaRecording();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const beginMediaRecording = () => {
        try {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            setError("Failed to start recording. MediaRecorder might not be supported.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    useEffect(() => {
        if (!isRecording && recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            setPreviewUrl(url);
        }
    }, [isRecording, recordedChunks]);

    const downloadVideo = () => {
        if (previewUrl) {
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = previewUrl;
            a.download = `recording-${new Date().getTime()}.webm`;
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {/* Viewport */}
            <div className="relative bg-black rounded-3xl overflow-hidden aspect-video shadow-2xl border border-border group">
                {!stream && !previewUrl && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 gap-4">
                        <div className="p-6 rounded-full bg-white/5 backdrop-blur-sm">
                            <Camera size={48} />
                        </div>
                        <p>Camera is off</p>
                        <button
                            onClick={startCamera}
                            className="bg-accent-primary hover:bg-accent-primary/90 text-white px-6 py-2 rounded-full font-bold transition-all"
                        >
                            Enable Camera
                        </button>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 bg-red-950/20 gap-4 p-8 text-center">
                        <AlertCircle size={48} />
                        <p>{error}</p>
                        <button onClick={startCamera} className="text-white underline text-sm mt-2">Try Again</button>
                    </div>
                )}

                {/* Video Preview */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className={`w-full h-full object-cover transform scale-x-[-1] ${!stream || previewUrl ? 'hidden' : 'block'}`}
                ></video>

                {/* Countdown Overlay */}
                {countdown > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 backdrop-blur-sm">
                        <div className="text-9xl font-black text-white animate-bounce">
                            {countdown}
                        </div>
                    </div>
                )}

                {/* Recording Indicator */}
                {isRecording && (
                    <div className="absolute top-6 right-6 flex items-center gap-2 bg-red-500/80 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-bold animate-pulse z-10">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        REC
                    </div>
                )}

                {/* Playback Preview */}
                {previewUrl && (
                    <div className="absolute inset-0 z-10 bg-black">
                        <video src={previewUrl} controls className="w-full h-full object-contain"></video>
                        <button
                            onClick={() => { setPreviewUrl(null); setRecordedChunks([]); }}
                            className="absolute top-4 left-4 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
                        >
                            <RefreshCw size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="bg-surface border border-border rounded-2xl p-4 flex items-center justify-center gap-4">
                {!isRecording && !previewUrl && (
                    <button
                        onClick={startRecording}
                        disabled={!stream}
                        className="flex items-center gap-2 bg-accent-primary hover:bg-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-accent-primary/25"
                    >
                        <Video size={20} />
                        Start Recording
                    </button>
                )}

                {isRecording && (
                    <button
                        onClick={stopRecording}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-red-500/25"
                    >
                        <StopCircle size={20} />
                        Stop Recording
                    </button>
                )}

                {previewUrl && (
                    <button
                        onClick={downloadVideo}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/25"
                    >
                        <Download size={20} />
                        Download Video
                    </button>
                )}
            </div>

            <div className="text-center text-xs text-text-tertiary">
                Note: Recordings are processed locally in your browser. Nothing is uploaded to any server.
            </div>
        </div>
    );
}
