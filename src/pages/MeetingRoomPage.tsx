import {
  LiveKitRoom,
  LocalUserChoices,
  PreJoin
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideoConference } from "../components/openvidu/VideoConferenceComponent";
import { useMeetings } from "../hooks/useMeetings";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";

export default function MeetingRoomPage() {
  const [socketInstance, setSocketInstance] = useState<Socket>();
  const [gesture, setGesture] = useState("");
  const navigate = useNavigate();
  const roomName = "quickstart-room";
  const { getToken } = useMeetings();
  const [token, setToken] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  async function joinRoom(values: LocalUserChoices) {
    var response = await getToken(roomName, values.username)
    setToken(response.token);
    setServerUrl(response.serverUrl);
    setIsJoined(true);
    var env = import.meta.env.MODE;
    const websocketHost = env === 'localtest' ? 'localhost:6080/' : env === 'dev' ? '172.20.10.11:6080/' : '/';
    const socket = io(websocketHost, {
      transports: ["websocket"],
    });

    setSocketInstance(socket);

    socket.on("connect", () => {
      console.log("connect");
    });

    socket.on("disconnect", (data) => {
      console.log(data);
    });
  }

  return (
    <div
      className="
                fixed
                top-0 left-0 right-0 bottom-0
                place-content-center
                bg-black
            "
      data-lk-theme="default"
    >
      {!isJoined ? (
        <PreJoin
          camLabel="相機"
          micLabel="麥克風"
          joinLabel="加入"
          userLabel="使用者名稱"
          onSubmit={joinRoom}
        />
      ) : (socketInstance && <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={serverUrl}
        data-lk-theme="default"
        style={{ height: "100dvh" }}
        onDisconnected={() => {
          navigate(-1);
          socketInstance.disconnect();
        }}
      >
        <VideoConference socket={socketInstance} />
      </LiveKitRoom>
      )}
    </div>
  );
}