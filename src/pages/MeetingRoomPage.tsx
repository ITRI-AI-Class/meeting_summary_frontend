import {
    LiveKitRoom,
    LocalUserChoices,
    PreJoin
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideoConference } from "../components/openvidu/VideoConferenceComponent";
import { useMeetings } from "../hooks/useMeetings";

export default function MeetingRoomPage() {
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
            ) : <LiveKitRoom
                video={true}
                audio={true}
                token={token}
                serverUrl={serverUrl}
                data-lk-theme="default"
                style={{ height: "100dvh" }}
                onDisconnected={() => navigate(-1)}
            >
                <VideoConference />
            </LiveKitRoom>}
        </div>
    );
}