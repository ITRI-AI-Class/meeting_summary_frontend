export enum MeetingSummaryStatus {
    Processing = 'processing',
    Completed = 'completed',
    Failed = 'failed',
}

export interface MeetingSummary {
    id: string;
    data: MeetingSummaryApiResponse;
    date: string;
    duration?: string;
    thumbnailUrl?: string;
    videoUrl?: string;
    status: MeetingSummaryStatus;
}

interface Summary {
    atmosphere: string[];
    content: string;
    tags: string[];
    title: string;
}

export interface Segment {
    endTime: number;
    id: number;
    startTime: number;
    text: string;
}

export interface MeetingSummaryApiResponse {
    message: string;
    data: {
        summary: Summary;
        transcription: {
            duration: number;
            segments: Segment[];
        };
    }
}