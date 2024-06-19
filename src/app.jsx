import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/static/routes";
import Navbar from "./components/static/navbar";
import Footer from "./components/static/footer";
import Alert from "./styles/Alert";

//Atom
import { useAtom } from 'jotai';
import { alertAtom } from "./store/alert";

export default function App() {
  const [alert, setAlert] = useAtom(alertAtom);
  
  return (
    <BrowserRouter>
      <header>
        <Navbar />
        <Alert 
          showAlert={alert.showAlert} 
          setShowAlert={setAlert} 
          message={alert.message} 
          type={alert.alertType} 
        />
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
