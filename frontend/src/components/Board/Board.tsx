import {
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { Column } from "../Column";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import type { ColumnId, TaskType } from "../../types/";
import { COLUMNS } from "../../consts";
import { SearchBar } from "../SearchBar";
import { useAppContext } from "../../hooks/useAppContext";
import { BoardInfo } from "../BoardInfo";
import S from "./Board.module.css";

export const Board = () => {
  const {
    boardId,
    tasks,
    setTasks,
    activeTask,
    setActiveTask,
    activeColumn,
    setActiveColumn,
    query,
    updateTask,
    notify,
  } = useAppContext();

  function onDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    const task = tasks.find((task) => task.id === id);
    if (!task) return;
    setActiveTask(task);
    setActiveColumn(task.columnId);
  }
  function onDragOver(event: DragEndEvent) {
    const { over } = event;
    if (!over) return;
    const { id: overId } = over;

    if (!activeTask) return;
    const activeIndex = tasks.findIndex((t) => t.id === activeTask?.id);
    const overIndex = tasks.findIndex((t) => t.id === overId);
    const overTask = tasks[overIndex];
    if (activeTask && overTask && activeTask.columnId !== overTask.columnId) {
      activeTask.columnId = overTask.columnId;
      return arrayMove(tasks, activeIndex, overIndex - 1) as TaskType[];
    }

    return arrayMove(tasks, activeIndex, overIndex) as TaskType[];
  }

  function onDragEnd(event: DragEndEvent) {
    const { over } = event;

    if (!over) return;
    const { id: overId } = over;
    if (overId === activeColumn) return;

    const validIds = ["todo", "in-progress", "done"];

    if (validIds.includes(overId as ColumnId)) {
      const columnId = overId as ColumnId;

      const newTasks = tasks.map((task) => {
        if (task.id === activeTask?.id) {
          try {
            updateTask({ ...task, columnId }, boardId);
            notify("Task status changed");
          } catch (error) {
            console.error(error);
            notify("Error updating task");
          }

          return { ...task, columnId: overId };
        }
        return task;
      }) as TaskType[];

      setTasks(newTasks);
      setActiveTask(null);
      setActiveColumn(null);
    }
  }

  const sensors = useSensors(useSensor(MouseSensor));
  return (
    <>
      <SearchBar />
      {tasks && <BoardInfo />}

      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <SortableContext items={COLUMNS.map((column) => column.id)}>
          {!tasks && <div>Please, enter a valid board ID</div>}
          {query.isLoading && <div>Loading...</div>}

          {tasks && (
            <div className={S.columns}>
              {COLUMNS.map((column) => (
                <Column
                  key={column.id}
                  columnId={column.id}
                  title={column.title}
                />
              ))}
            </div>
          )}
        </SortableContext>
      </DndContext>
    </>
  );
};
