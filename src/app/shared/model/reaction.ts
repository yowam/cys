import { Confession } from "./confession";

export enum ReactionType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  CARE = 'CARE',
  HAHA = 'HAHA',
  WOW = 'WOW',
  ANGRY = 'ANGRY',
  SAD = 'SAD'
}

export interface Reaction {
  belongsToId: string;
  confessionId: string;
  type: ReactionType;
  createdAt: string;
  id: string;
  updatedAt?: string;
  confession?: Confession;
}
