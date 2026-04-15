export interface Meal {
  id: string;
  title: string;
  image: string;
  tags: string[];

  helpful: number;
  saved: boolean;

  comments: number;

  commentList: CommentNode[];

  user: {
    id: string;
    username: string;
    avatar: string;
  };

  createdAt: number;
}

export interface CommentNode {
  id: string;

  user: {
    id: string;
    username: string;
    avatar: string;
  };

  text: string;
  createdAt: number;

  likes: number;
  likedByUser: boolean;

  replies: CommentNode[];
}
