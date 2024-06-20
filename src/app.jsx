import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/static/routes";
import Navbar from "./components/static/navbar";
import Footer from "./components/static/footer";
import Alert from "./styles/Alert";
import LoadingSpinner from "./components/static/LoadingSpinner";

//Atom
import { useAtom } from 'jotai';
import { userAtom } from "./store/user";
import { isLoadingAtom } from "./store/isLoading";


export default function App() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [, setUser] = useAtom(userAtom);
  // When the component mounts, read the persisted state from localStorage
  useEffect(() => {
    const persistedState = localStorage.getItem('user');
    if (persistedState) {
      setUser(JSON.parse(persistedState));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main>
        <AppRoutes />
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}
