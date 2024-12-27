export enum MeetingSummaryStatus {
    Processing = 'processing',
    Completed = 'completed',
    Failed = 'failed',
}

export interface MeetingSummary {
    id: number;
    title: string;
    tags: string[];
    date: string;
    duration?: string;
    thumbnailUrl?: string;
    videoUrl?: string;
    summary?: string;
    transcript?: string;
    status: MeetingSummaryStatus;
}