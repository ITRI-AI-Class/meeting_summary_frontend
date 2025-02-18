import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const CameraStream: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);
    const [buttonStatus, setButtonStatus] = useState(false);
    const [socketInstance, setSocketInstance] = useState<Socket>();
    const [gesture, setGesture] = useState("");

    const handleClick = () => {
        if (buttonStatus === false) {
            setButtonStatus(true);
        } else {
            setButtonStatus(false);
        }
    };

    useEffect(() => {
        if (buttonStatus === true) {
            const socket = io("localhost:6080/", {
                transports: ["websocket"],
            });

            setSocketInstance(socket);

            socket.on("connect", () => {
                console.log("connect");
            });

            setLoading(false);

            socket.on("disconnect", (data) => {
                console.log(data);
            });

            socket.on("get", (data) => {
                console.log(data);
                setGesture(data);
            });

            return function cleanup() {
                socket.disconnect();
            };
        }
    }, [buttonStatus]);

    useEffect(() => {
        if (socketInstance?.active) {
            // 啟動攝影機
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch((err) => console.error("無法開啟攝影機:", err));
        
            // 影像傳輸
            const sendFrame = () => {
                if (videoRef.current && canvasRef.current && socketInstance?.active) {
                    const ctx = canvasRef.current.getContext("2d");
                    canvasRef.current.width = videoRef.current.videoWidth;
                    canvasRef.current.height = videoRef.current.videoHeight;
                    ctx?.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
                    // 轉換影像為 base64
                    const imageData = canvasRef.current.toDataURL("image/jpeg");
                    socketInstance.send(imageData);
                }
            };
        
            // 每 250 毫秒傳送一次
            const intervalId = setInterval(sendFrame, 2500);
        
            // 當 socket 關閉時停止傳輸
            return () => clearInterval(intervalId);
        }
    }, [socketInstance]);

    return (
        <div>
            <video ref={videoRef} autoPlay className="w-full h-auto" />
            <canvas ref={canvasRef} className="hidden" />
            {gesture && <p>{gesture}</p>}
            {!buttonStatus ? (
                <button onClick={handleClick}>turn chat on</button>
            ) : (
                <>
                    <button onClick={handleClick}>turn chat off</button>
                </>
            )}
        </div>
    );
};

export default CameraStream;
