import React, { MutableRefObject } from "react";
import { Socket } from "socket.io-client";

import Navbar from "../Navbar/Navbar";

import { useAppSelector } from "../../store/hooks";

import "./joinroom.css";

const JoinRoom = ({
  socketRef,
  setIsRoomJoined,
  room,
  setRoom,
}: {
  socketRef: MutableRefObject<Socket | null>;
  setIsRoomJoined: React.Dispatch<React.SetStateAction<boolean>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { user } = useAppSelector((state) => state);

  const joinRoom = () => {
    socketRef.current?.emit("join-room", {
      room: room,
      username: user.user?.fullName,
    });
    setIsRoomJoined(true);
  };

  return (
    <div>
      <Navbar />

      <div className="room-cnt">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            joinRoom();
          }}
          className="join-room"
        >
          <h3 className="text-center">&lt;&gt; Dev Rooms &lt;/&gt;</h3>
          <input
            type="text"
            className="val-field"
            value={user.user?.fullName}
            disabled
          />
          <select
            className="val-field"
            onChange={(e) => setRoom(e.target.value)}
            value={room}
          >
            <option value="node">Node</option>
            <option value="react">React</option>
            <option value="chitchat">Chit Chat</option>
          </select>
          <button className="val-field btn btn-primary" type="submit">
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
