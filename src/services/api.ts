// apiService.js
import { MeetingSummaryApiResponse } from '../types/meetingSummaries';
import { User } from '../types/user';
import axios from 'axios';

const API_DELAY = 1000; // Simulate API delay

async function updateUserProfile(user: User, data: Partial<User>): Promise<User> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, API_DELAY));

  // In a real app, this would be an API call
  return {
    ...user,
    ...data,
  } as User;
}

// API 呼叫函式，用於上傳音訊檔案並獲得摘要
const summarizeWithAudioFile = async (uid:string, file: File) => {
  const formData = new FormData();
  formData.append('uid', uid);
  formData.append('audio', file);

  console.log(formData);

  try {
    const response = await axios.post('http://127.0.0.1:5000/summarize', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    // const meetingSummaryResponse: MeetingSummaryApiResponse = JSON.parse(response.data as string);
    const meetingSummaryResponse: MeetingSummaryApiResponse = response.data as MeetingSummaryApiResponse;
    return meetingSummaryResponse;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};


// const summarizeWithAudioFile = async (file: File) => {
//   const formData = new FormData();
//   formData.append('audio', file);

//   try {
//     const meetingaiSummarizeAPI = httpsCallable(functions, 'meetingai');
//     const response = await meetingaiSummarizeAPI(formData);
//     const meetingSummaryResponse: MeetingSummaryApiResponse = response.data as MeetingSummaryApiResponse;
//     return meetingSummaryResponse;
//   } catch (error) {
//     console.error('Error calling function:', error);
//     throw error;
//   }
// };

// 一次性導出兩個函式
export { updateUserProfile, summarizeWithAudioFile };
