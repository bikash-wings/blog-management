export type CommentType = {
  id: number;
  content: string;
  createdAt: Date;
  User: {
    fullName: string;
    avatar: string;
  };
};
