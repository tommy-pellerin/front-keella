import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex justify-around border-t-2 py-5">
      <div>
        <p>© 2024 Keella, all right reserved.</p>
      </div>
      <div>
        <ul>
          <li><Link to="#">Condition d&apos;utilisation</Link></li>
          <li><Link to="#">Politique de confidentialité</Link></li>
          <li><Link to="#">Mentions légales</Link></li>
        </ul>
      </div>
      <div>
        <ul>
          <li><Link to="#">Questions fréquentes</Link></li>
          <li><Link to="#">Contact</Link></li>
        </ul>
      </div>
      <div>
        <a href="#">github</a>
        <a href="#">facebook</a>
        <a href="#">Instagram</a>
      </div>
    </footer>
  );
}
