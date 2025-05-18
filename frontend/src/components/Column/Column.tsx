import { useSortable } from "@dnd-kit/sortable";
import { Task } from "../Task";
import { useAppContext } from "../../hooks/useAppContext";
import type { ColumnId, TaskType } from "../../types";
import { useState } from "react";
import S from "./Column.module.css";

interface Props {
  title: string;
  columnId: ColumnId;
}

export const Column: React.FC<Props> = ({ title, columnId }) => {
  const { tasks, createTask, setTasks, notify } = useAppContext();

  const [newTaskContent, setNewTaskContent] = useState("");

  const { setNodeRef } = useSortable({
    id: columnId,
    data: {
      type: "COLUMN",
      tasks,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskContent) {
      try {
        setNewTaskContent("");
        const newTask: TaskType = {
          content: newTaskContent,
          columnId,
          id: Date.now(),
        };
        createTask(newTask);
        setTasks([...tasks, newTask]);
        notify("Task created");
      } catch (error) {
        console.error(error);
        notify("Error creating task");
      }
    }
  };

  return (
    <div ref={setNodeRef} className={S.column}>
      <h3 className={S.column_title}>{title}</h3>
      <form onSubmit={handleSubmit} className={S.column_form}>
        <input
          type="text"
          placeholder="Enter Task Content"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
        />

        <button className={`${S.column_form_button} button_custom`}>+</button>
      </form>
      {tasks
        .filter((task) => task.columnId === columnId)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};
