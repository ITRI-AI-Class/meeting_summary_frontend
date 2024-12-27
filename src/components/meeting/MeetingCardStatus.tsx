import React from 'react';
import { Loader2 } from 'lucide-react';
import { MeetingSummaryStatus } from '../../types/meetingSummaries';

interface MeetingCardStatusProps {
  status?: MeetingSummaryStatus;
}

export function MeetingCardStatus({status}: MeetingCardStatusProps) {
  if (!status || status === MeetingSummaryStatus.Completed) return null;

  return (
    <div className="mt-2 flex items-center">
      {status === MeetingSummaryStatus.Processing ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 text-indigo-600 animate-spin" />
          <span className="text-sm text-gray-600">Processing...</span>
        </>
      ) : (
        <span className="text-sm text-red-600">Processing failed</span>
      )}
    </div>
  );
}