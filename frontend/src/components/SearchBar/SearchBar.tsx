import { useAppContext } from "../../hooks/useAppContext";
import S from './SearchBar.module.css';

export const SearchBar = () => {
  const { setBoardId, notify } = useAppContext();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const boardId = document.getElementById("boardId") as HTMLInputElement;
    setBoardId(boardId.value);
    notify("Board ID updated");
  };

  return (
    <form onSubmit={handleSubmit} className={S.searchBar}>
      <input
        type="text"
        placeholder="Enter board ID"
        className={S.searchBar_input}
        id="boardId"
      />
      <button type="submit" className={`${S.searchBar_button} button_custom`}>Search</button>
    </form>
  );
};
