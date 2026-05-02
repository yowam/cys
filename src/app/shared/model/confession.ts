import { Comment } from './comment';
import { Reaction } from './reaction';

export interface Confession {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  belongsToId: string;
  belongsTo: string;
  likeCount: number;
  slug: string;
  contentStatus: string;
  tags: string[];
  comments: Comment[];
  reactions: Reaction[];
  score?: number;
  similarConfessions?: Confession[];
}
