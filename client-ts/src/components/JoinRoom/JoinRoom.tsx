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
  handleJoinRoom,
}: {
  socketRef: MutableRefObject<Socket | null>;
  setIsRoomJoined: React.Dispatch<React.SetStateAction<boolean>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  handleJoinRoom: (roomId: string) => void;
}) => {
  const { user } = useAppSelector((state) => state);

  return (
    <div>
      <Navbar />

      <div className="room-cnt">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleJoinRoom(room);
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
