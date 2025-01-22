import { MeetingRecordingApiResponse } from "../types/meetingRecording";
import { MeetingTokenApiResponse } from "../types/meetingToken";
import api from "./api";

class OpenviduService {
  getToken(roomName: string, participantName: string) {
    return api.post<MeetingTokenApiResponse>("/openvidu/token", {
      roomName: roomName,
      participantName: participantName
    });
  }

  startRecording(roomName: string) {
    return api.post("/openvidu/recordings/start", {
      roomName: roomName
    });
  }

  stopRecording(roomName: string) {
    return api.post<MeetingRecordingApiResponse>("/openvidu/recordings/stop", {
      roomName: roomName
    });
  }

  deleteRecording(recordingName: string) {
    return api.delete(`/openvidu/recordings/${recordingName}`);
  }

  listRecordings(roomName?:string, roomId?:string) {
    const url = "/openvidu/recordings" + (roomName ? `?roomName=${roomName}` + (roomId ? `&roomId=${roomId}` : "") : "");
    return api.get(url);
  }
}

export default new OpenviduService()