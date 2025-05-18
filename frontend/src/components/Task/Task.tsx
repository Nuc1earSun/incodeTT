import { useSortable } from "@dnd-kit/sortable";
import { useAppContext } from "../../hooks/useAppContext";
import { useState } from "react";
import type { TaskType } from "../../types/types";
import S from "./Task.module.css";

interface Props {
  task: TaskType;
}

export const Task: React.FC<Props> = ({ task }) => {
  const { id, content } = task;
  const { updateTask, boardId, deleteTask, setTasks, tasks, notify } =
    useAppContext();
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id,
    data: {
      type: "TASK",
      id,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const [newContent, setNewContent] = useState(content);

  const handleEdit = () => {
    try {
      if (newContent !== null) {
        updateTask({ ...task, id, content: newContent }, boardId);
        notify("Task updated");
      }
    } catch (error) {
      console.error(error);
      notify("Error updating task");
    }
  };
  const handleDelete = () => {
    try {
      deleteTask(id.toString(), boardId);
      setTasks(tasks.filter((task) => task.id !== id));
      notify("Task deleted");
    } catch (error) {
      notify("Error deleting task");
      console.error(error);
    }
  };
  return (
    <div className={S.task}>
      <button
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className={`${S.task_button} button_custom`}
      >
        ...
      </button>
      <div className={S.task_content}>
        <textarea
          className={S.textarea}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button
          onClick={handleEdit}
          className={`${S.task_button} button_custom`}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className={`${S.task_button} button_custom`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
