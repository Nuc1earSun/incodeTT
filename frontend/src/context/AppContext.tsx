import React, { createContext, useState } from "react";
import type { ColumnId, TaskType } from "../types/types";
import type { AppContextType } from "../types/AppContextType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [boardId, setBoardId] = useState<string>("1");
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [activeColumn, setActiveColumn] = useState<ColumnId | null>(null);

  const controller = new AbortController();

  const notify = (message: string) => toast(message);

  const query = useQuery({
    queryKey: ["boards", boardId],
    queryFn: async () => {
      const tasks = await getTaskById(boardId);
      setTasks(tasks);
      return tasks;
    },
  });

  const getTaskById = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/boards/${id}`);
      setTasks(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      controller.abort();
    }
  };
  const deleteBoard = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/boards/${id}`);
      setBoardId("1");
    } catch (error) {
      console.error(error);
      controller.abort();
    }
  };
  const updateTask = async (task: TaskType, id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/boards/${id}`,
        task,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      controller.abort();
    }
  };
  const deleteTask = async (id: string, boardId: string) => {
    try {
      await axios.delete(`http://localhost:3000/boards/${boardId}/${id}`);
    } catch (error) {
      console.error(error);
      controller.abort();
    }
  };
  const createTask = async (task: TaskType) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/boards/${boardId}/newtask`,
        task,
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      return response.data;
    } catch (error) {
      console.error(error);
      controller.abort();
    }
  };
  const contextValue = {
    boardId,
    setBoardId,
    tasks,
    setTasks,
    activeTask,
    setActiveTask,
    activeColumn,
    setActiveColumn,
    query,
    deleteBoard,
    updateTask,
    deleteTask,
    createTask,
    notify,
  };
  return (
    <AppContext.Provider value={contextValue}>
      <ToastContainer autoClose={2000}/>
      {children}
    </AppContext.Provider>
  );
};
