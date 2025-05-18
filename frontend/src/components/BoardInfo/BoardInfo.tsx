import { useAppContext } from "../../hooks/useAppContext";
import S from "./BoardInfo.module.css";

export const BoardInfo = () => {
  const { deleteBoard, boardId, query, notify } = useAppContext();
  const handleDelete = async () => {
    try {
      deleteBoard(boardId);
      notify("Board deleted");
    } catch (error) {
      console.error(error);
      notify("Error deleting board");
    }
  };

  return (
    <div className={S.boardInfo}>
      {boardId && !query.isError && (
        <h2 className={S.boardInfo_title}>Board № {boardId.toString()}</h2>
      )}
      <button
        onClick={handleDelete}
        className={`${S.boardInfo_button} button_custom`}
      >
        Delete Board
      </button>
    </div>
  );
};
