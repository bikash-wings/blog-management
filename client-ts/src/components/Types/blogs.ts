export type BlogType = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  likes: number[];
  views: number;
  thumbnail: string;
  status: ["Drafted", "Published", "Active", "Inactive"];
  User: {
    fullName: string;
    avatar: string;
  };
};
