import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../store/user";
import { deleteData } from "../../services/data-fetch";

const DeleteAccount = () => {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    let userInput = prompt("Pour confirmer la suppression de votre compte, veuillez taper 'je confirme'.");
  
    while (userInput !== "je confirme") {
      if (userInput === null) { // L'utilisateur a cliqué sur "Annuler" dans la boîte de dialogue
        return; // Sortir de la fonction si l'utilisateur annule l'action
      }
      userInput = prompt("Entrée incorrecte. Pour confirmer, tapez 'je confirme'.");
    }
  
    // try {
    //   await deleteData(`/users/${user.id}`);
    //   navigate("/");
    // } catch (error) {
    //   console.error("Une erreur s'est produite lors de la suppression du compte.");
    // }
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