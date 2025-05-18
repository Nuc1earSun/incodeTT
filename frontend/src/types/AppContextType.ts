import type { UseQueryResult } from "@tanstack/react-query";
import type { ColumnId, TaskType } from "./types";

export type AppContextType = {
  boardId: string;
  setBoardId: (id: string) => void;
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
  activeTask: TaskType | null;
  setActiveTask: (task: TaskType | null) => void;
  activeColumn: string | null;
  setActiveColumn: (column: ColumnId | null) => void;
  query: UseQueryResult<TaskType[] | null, unknown>;
  deleteBoard: (id: string) => void;
  updateTask: (task: TaskType, id: string) => void;
  deleteTask: (id: string, boardId: string) => void;
  createTask: (task: TaskType) => void;
  notify: (message: string) => void;
};
