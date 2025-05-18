import type { UniqueIdentifier } from "@dnd-kit/core";
import type { COLUMNS } from "../consts/consts";

export type ColumnId = (typeof COLUMNS)[number]["id"];

export interface TaskType {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
}

export interface Query {
  data: TaskType[] | null;
  error: null | Error;
  isLoading: boolean;
}
