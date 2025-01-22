import { useEnsureRoom } from "@livekit/components-react";
import { RoomEvent } from "livekit-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useMeetingSummaries } from "../../contexts/MeetingSummariesContext";
import OpenviduService from "../../services/OpenviduService";

export function RecordingButton() {
    const room = useEnsureRoom();
    const [recordText, setRecordText] = useState('錄製');
    const { summarizeMeeting } = useMeetingSummaries()!;
    const { user } = useAuth();
    const [recordingFileName, setRecordingFileName] = useState('');

    const showNotification = () => {
        toast.success('摘要生成完成', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };
    const showNotificationError = () => {
        toast.error('摘要生成失敗', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    useEffect(() => {
        const handleRecordingStatusChange = async (isRecording: boolean) => {
            if (isRecording) {
                setRecordText('停止');
            } else {
                setRecordText('錄製');
                if (user && recordingFileName !== "") {
                    try {
                        const result = await summarizeMeeting(user.id, undefined, recordingFileName);
                        if (result) {
                            showNotification();
                        } else {
                            showNotificationError();
                        }
                    } catch (error) {
                        showNotificationError();
                    }
                } else {
                    showNotificationError();
                }
            }
        };
    
        room.on(RoomEvent.RecordingStatusChanged, handleRecordingStatusChange);
    
        // 清理舊監聽器
        return () => {
            room.off(RoomEvent.RecordingStatusChanged, handleRecordingStatusChange);
        };
    }, [room, user, recordingFileName]);

    const handleRecord = async () => {
        if (!room.isRecording) {
            setRecordText('錄製中...');
            const response = await OpenviduService.startRecording(room.name);
            console.log(response.data)
            if (response.status === 409) {
                setRecordText('錄製');
            }
        } else {
            setRecordText('停止中...');
            const response = await OpenviduService.stopRecording(room.name);
            console.log(response.data.recording)
            if (response.status === 409) {
                setRecordText('停止');
            }else if(response.status === 200){
                setRecordingFileName(response.data.recording.name);
            }
        }
    };

    return (
        <button
            onClick={handleRecord}
            id="recordButton"
            // disabled={!isRecording}
            className="flex items-center justify-center px-6 py-3 rounded-md bg-red-600 text-white font-bold text-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
            <span id="recordIcon" className="mr-2 w-4 h-4 bg-red-800 rounded-full"></span>
            <span id="recordText"> {recordText}</span>
        </button>
    );
}