/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

type PropsType = {
  meetingNumber: string;
  role: string;
  sdkKey: string;
  sdkSecret: string;
  leaveUrl: string;
  userName: string;
  userEmail: string;
  password: string;
};

const Zoom: React.FC<PropsType> = (props: PropsType) => {
  useEffect(() => {
    const loadZoomMeeting = async () => {
      const { ZoomMtg } = await import("@zoomus/websdk");

      ZoomMtg.setZoomJSLib("https://source.zoom.us/lib", "/av");

      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();

      ZoomMtg.generateSDKSignature({
        meetingNumber: props.meetingNumber,
        role: props.role,
        sdkKey: props.sdkKey,
        sdkSecret: props.sdkSecret,
        success: function (signature: any) {
          ZoomMtg.init({
            leaveUrl: props.leaveUrl,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            success: function (data: any) {
              ZoomMtg.join({
                meetingNumber: props.meetingNumber,
                userName: props.userName,
                userEmail: props.userEmail,
                passWord: props.password,
                signature: signature.result,
                sdkKey: props.sdkKey,
                tk: "",
                success: function () {
                  console.log("----------- Meeting Joined ------------");
                },
                error: function (err: any) {
                  console.log(err);
                },
              });
            },
            error: function (err: any) {
              console.log(err);
            },
          });
        },
        error: function (error: any) {
          console.log(error);
        },
      });
    };

    loadZoomMeeting();
  }, []);

  return <h1>Zoom will be load here</h1>;
};

export default Zoom;
