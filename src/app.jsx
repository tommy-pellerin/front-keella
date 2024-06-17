import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/static/routes";
import Navbar from "./components/static/navbar";
import Footer from "./components/static/footer";

export default function App() {
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
