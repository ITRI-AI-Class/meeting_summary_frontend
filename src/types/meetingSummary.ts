export interface MeetingSummary {
    id: string;
    date: string;
    summary: Summary;
    transcription: {
        duration: number;
        segments: Segment[];
    };
    thumbnailUrl: string;
    srcUrl: string;
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
    summary: MeetingSummary
}