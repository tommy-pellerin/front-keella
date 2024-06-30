import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../../services/data-fetch";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const [user,setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    let userInput = prompt("Pour confirmer la suppression de votre compte, veuillez taper 'je confirme'.");
  
    while (userInput !== "je confirme") {
      if (userInput === null) { // L'utilisateur a cliqué sur "Annuler" dans la boîte de dialogue
        return; // Sortir de la fonction si l'utilisateur annule l'action
      }
      userInput = prompt("Entrée incorrecte. Pour confirmer, tapez 'je confirme'.");
    }
    
    try {
      const data = await deleteData(`/users/${user.id}`);
      // reset local storage and cookies
      setUser({ id: "", email: "", isLogged: false });
      Cookies.remove("keellauth");
      toast.success("Votre compte a bien été supprimé ainsi que vos données personnelles");
      navigate("/");
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression du compte.");
      // console.error("Une erreur s'est produite lors de la suppression du compte.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
      <button
        className="button-red-small my-2 flex flex-center"
        onClick={handleDeleteAccount}
      >
        <p className="text-white">Supprimer définitivement votre compte.</p>
      </button>
    </div>
    </>
  );
};

export default DeleteAccount;