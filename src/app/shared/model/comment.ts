import { Confession } from "./confession";

export interface Comment {
  belongsToId: string;
  body: string;
  commentTreeId: string;
  commentTreePath: string;
  confessionId: string;
  contentStatus: string;
  createdAt: string;
  id: string;
  updatedAt?: string;
  confession?: Confession;
}

export interface CommentWithTreeData extends Comment {
  treeData: boolean[];
  isCollapsed?: number;
  hide?: boolean;
}
