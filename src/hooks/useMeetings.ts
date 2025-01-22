import { useCallback } from "react";
import OpenviduService from "../services/OpenviduService";

export function useMeetings() {
  const getToken = useCallback(async (roomName: string, participantName: string) => {
    var response = await OpenviduService.getToken(roomName, participantName);
    return response.data;
  }, []);

  const startRecording = useCallback(async (roomName: string) => {
    await OpenviduService.startRecording(roomName);
  }, []);

  const stopRecording = useCallback(async (roomName: string) => {
    await OpenviduService.startRecording(roomName);
  }, []);

  return { getToken, startRecording, stopRecording };
}