export type MessageType = {
  id: number;
  Sender: {
    id: number;
    fullName: string;
    avatar: string;
  };
  receiver: {
    id: number;
    fullName: string;
    avatar: string;
  };
  content: string;
  createdAt: Date;
};
