import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Board } from "./components/Board";
import { AppContextProvider } from "./context/AppContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <div className="app_container">
          <Board />
        </div>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
