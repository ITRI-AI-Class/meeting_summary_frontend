import type {
  MessageDecoder,
  MessageEncoder,
  TrackReferenceOrPlaceholder,
  WidgetState,
} from '@livekit/components-core';
import { isEqualTrackRef, isTrackReference, isWeb, log } from '@livekit/components-core';
import { RoomEvent, Track } from 'livekit-client';
import * as React from 'react';
import type { MessageFormatter } from '@livekit/components-react';
import {
  CarouselLayout,
  ConnectionStateToast,
  FocusLayout,
  FocusLayoutContainer,
  GridLayout,
  LayoutContextProvider,
  ParticipantTile,
  RoomAudioRenderer,
  useEnsureRoom,
} from '@livekit/components-react';
import { useCreateLayoutContext } from '@livekit/components-react';
import { usePinnedTracks, useTracks } from '@livekit/components-react';
import { ControlBar } from './ControlBarComponent';
import { Chat } from './ChatComponent';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'react-toastify';

/**
 * @public
 */
export interface VideoConferenceProps extends React.HTMLAttributes<HTMLDivElement> {
  socket: Socket;
  chatMessageFormatter?: MessageFormatter;
  chatMessageEncoder?: MessageEncoder;
  chatMessageDecoder?: MessageDecoder;
  /** @alpha */
  SettingsComponent?: React.ComponentType;
}

/**
 * The `VideoConference` ready-made component is your drop-in solution for a classic video conferencing application.
 * It provides functionality such as focusing on one participant, grid view with pagination to handle large numbers
 * of participants, basic non-persistent chat, screen sharing, and more.
 *
 * @remarks
 * The component is implemented with other LiveKit components like `FocusContextProvider`,
 * `GridLayout`, `ControlBar`, `FocusLayoutContainer` and `FocusLayout`.
 * You can use these components as a starting point for your own custom video conferencing application.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <VideoConference />
 * <LiveKitRoom>
 * ```
 * @public
 */
export function VideoConference({
  socket,
  chatMessageFormatter,
  chatMessageDecoder,
  chatMessageEncoder,
  SettingsComponent,
  ...props
}: VideoConferenceProps) {
  const room = useEnsureRoom();
  const [widgetState, setWidgetState] = React.useState<WidgetState>({
    showChat: false,
    unreadMessages: 0,
    showSettings: false,
  });
  const lastAutoFocusedScreenShareTrack = React.useRef<TrackReferenceOrPlaceholder | null>(null);

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false },
  );

  const widgetUpdate = (state: WidgetState) => {
    log.debug('updating widget state', state);
    setWidgetState(state);
  };

  const layoutContext = useCreateLayoutContext();

  const screenShareTracks = tracks
    .filter(isTrackReference)
    .filter((track) => track.publication.source === Track.Source.ScreenShare);

  const focusTrack = usePinnedTracks(layoutContext)?.[0];
  const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));
  const localTrack = tracks.find((track) => track.participant.isLocal);

  React.useEffect(() => {
    // If screen share tracks are published, and no pin is set explicitly, auto set the screen share.
    if (
      screenShareTracks.some((track) => track.publication.isSubscribed) &&
      lastAutoFocusedScreenShareTrack.current === null
    ) {
      log.debug('Auto set screen share focus:', { newScreenShareTrack: screenShareTracks[0] });
      layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: screenShareTracks[0] });
      lastAutoFocusedScreenShareTrack.current = screenShareTracks[0];
    } else if (
      lastAutoFocusedScreenShareTrack.current &&
      !screenShareTracks.some(
        (track) =>
          track.publication.trackSid ===
          lastAutoFocusedScreenShareTrack.current?.publication?.trackSid,
      )
    ) {
      log.debug('Auto clearing screen share focus.');
      layoutContext.pin.dispatch?.({ msg: 'clear_pin' });
      lastAutoFocusedScreenShareTrack.current = null;
    }
    if (focusTrack && !isTrackReference(focusTrack)) {
      const updatedFocusTrack = tracks.find(
        (tr) =>
          tr.participant.identity === focusTrack.participant.identity &&
          tr.source === focusTrack.source,
      );
      if (updatedFocusTrack !== focusTrack && isTrackReference(updatedFocusTrack)) {
        layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: updatedFocusTrack });
      }
    }
  }, [
    screenShareTracks
      .map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`)
      .join(),
    focusTrack?.publication?.trackSid,
    tracks,
  ]);

  useEffect(() => {
    if (socket?.active && localTrack) {
      console.log(localTrack);
      const videoTrack = localTrack.publication?.track?.mediaStream;
      const videoElement = document.createElement("video");
      videoElement.srcObject = videoTrack!; // 綁定 track
      videoElement.play();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const sendFrame = async () => {
        try {
          if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            ctx!.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            const base64data = canvas.toDataURL("image/jpeg");
            console.log("run send image");
            if (socket.active) {
              // console.log(room);
              socket.send(JSON.stringify({ username: room.localParticipant.identity, image: base64data })); // 發送圖片
            }
          }
        } catch (error) {
          console.error("擷取影像錯誤:", error);
        }
      }

      // 每 250 毫秒傳送一次
      const intervalId = setInterval(sendFrame, 1000);

      // 當 socket 關閉時停止傳輸
      return () => clearInterval(intervalId);
    }
  }, [socket, localTrack]);

  useEffect(() => {
    if (socket?.active && localTrack) {
      socket.on("gestureDetection", (data) => {
        // 確保 data 是 JSON 物件
        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        // 確保資料格式正確
        if (data) {
          // 解構 JSON 物件
          const { gesture, username } = data;
          var pinTrack = tracks.find((track)=>track.participant.identity === username);
          if (gesture !== "None") {
            var message = username;
            console.log(gesture);
            switch (gesture) {
              case "Open_Palm":
              case "Closed_Fist":
                message += " 想要講話";
                break;
              case "Thumb_Up":
                message += " 表示贊同";
                break;
              case "Thumb_Down":
                message += " 表示反對";
                break;
              case "Victory":
                message += " 擺出拍照手勢";
                break;
              case "Pointing_Up":
                message += " 向上指";
                break;
            }
            // setGesture(gesture);
            showNotification(message,pinTrack);
          }
        } else {
          console.error("Invalid data format:", data);
        }
      });


      return () => {
        socket.off("gestureDetection");
      }
    }
  }, [socket, localTrack]);

  const showNotification = (message: string, pinTrack: TrackReferenceOrPlaceholder | undefined) => {
    toast.success(message, { // 使用翻譯鍵
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClick: () => {
        console.log('Notification clicked');
        if (pinTrack) {
          layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: pinTrack });
        }
      }
    });
  };

  // useWarnAboutMissingStyles();

  return (
    <div className="lk-video-conference" {...props}>
      {isWeb() && (
        <LayoutContextProvider
          value={layoutContext}
          // onPinChange={handleFocusStateChange}
          onWidgetChange={widgetUpdate}
        >
          <div className="lk-video-conference-inner">
            {!focusTrack ? (
              <div className="lk-grid-layout-wrapper">
                <GridLayout tracks={tracks}>
                  <ParticipantTile />
                </GridLayout>
              </div>
            ) : (
              <div className="lk-focus-layout-wrapper">
                <FocusLayoutContainer>
                  <CarouselLayout tracks={carouselTracks}>
                    <ParticipantTile />
                  </CarouselLayout>
                  {focusTrack && <FocusLayout trackRef={focusTrack} />}
                </FocusLayoutContainer>
              </div>
            )}
            {/* <video src='http://localhost:6080/recordings/quickstart-room-RM_eCCvXyYE33Aq-2025-01-20T034713.mp4' autoPlay controls></video> */}
            <ControlBar controls={{ chat: true, settings: !!SettingsComponent }} />
          </div>
          <Chat
            style={{ display: widgetState.showChat ? 'grid' : 'none' }}
            messageFormatter={chatMessageFormatter}
            messageEncoder={chatMessageEncoder}
            messageDecoder={chatMessageDecoder}
          />
          {SettingsComponent && (
            <div
              className="lk-settings-menu-modal"
              style={{ display: widgetState.showSettings ? 'block' : 'none' }}
            >
              <SettingsComponent />
            </div>
          )}
        </LayoutContextProvider>
      )}
      <RoomAudioRenderer />
      <ConnectionStateToast />
    </div>
  );
}
