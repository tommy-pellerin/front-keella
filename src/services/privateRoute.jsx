import { useLocation, Navigate } from "react-router-dom";
//Atom
import { useAtomValue } from 'jotai';
import { userAtom } from "../store/user";
import { useAtom } from "jotai";
import { alertAtom } from "../store/alert";

const PrivateRoute = ({ children }) => {
  const currentUser = useAtomValue(userAtom);
  const location = useLocation();
  const [,setAlert] = useAtom(alertAtom);
  
  console.log("islooged?", currentUser.isLogged);
  if (currentUser.isLogged) {
    return children;
  } else {
    setAlert({
      showAlert:true,
      message:"Vous devez etre connecté pour pouvoir poursuivre",
      alertType:"warning"
    })
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
}

export default PrivateRoute