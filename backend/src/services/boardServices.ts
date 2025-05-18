import { getCollection } from '../db';

const createBoard = async (id: string) => {
  try {
    const collection = await getCollection();
    await collection.insertOne({ boardId: id, tasks: [] });
  } catch (error) {
    console.error(error);
  }
};
export const getTasks = async (boardId: string) => {
  try {
    const collection = await getCollection();
    const result = await collection.find({ boardId }).toArray();

    if (!result.length) {
      await createBoard(boardId);
      return [];
    }
    return result[0].tasks;
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (task: { id: string }, id: string) => {
  try {
    const collection = await getCollection();
    const result = await collection.find({ boardId: id }).toArray();

    await collection.updateOne(
      { boardId: id },
      {
        $set: {
          tasks: result[0].tasks.map((t: any) => {
            if (t.id === task.id) {
              return task;
            }
            return t;
          }),
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};
export const deleteBoard = async (id: string) => {
  try {
    const collection = await getCollection();
    await collection.deleteOne({ boardId: id });
  } catch (error) {
    console.error(error);
  }
};
export const deleteTask = async (taskId: string, id: string) => {
  try {
    const collection = await getCollection();
    const result = await collection.find({ boardId: id }).toArray();
    
    await collection.updateOne(
      { boardId: id },
      {
        $set: {
          tasks: result[0].tasks.filter((t: any) => t.id !== taskId),
        },
      },
    )
  } catch (error) {
    console.error(error);
  }
};
export const createTask = async (task: any, boardId: string) => {
  try {
    const collection = await getCollection();
    const result = await collection.findOne({ boardId });
    
    const prevTasks = result?.tasks || [];
    await collection.updateOne(
      { boardId },
      {
        $set: {
          tasks: [...prevTasks, task],
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};