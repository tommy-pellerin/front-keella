import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../store/user";
import { deleteData } from "../../services/data-fetch";

const DeleteAccount = () => {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteData(`/users/${user.id}`);
        navigate("/");
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la suppression du compte.",
        );
      }
    }
  };

  return (
    <>
      <button
        className="border border-red-700 rounded-lg bg-red-500 hover:bg-red-800 px-3 py-3 w-3/5 sm:h-52 lg:h-44"
        onClick={handleDeleteAccount}
      >
        <div className="text-center">
          <h2 className="border-b border-white text-white">
            Supprimer mon compte
          </h2>
          <h3>Supprimer définitivement votre compte.</h3>
        </div>
      </button>
    </>
  );
};

export default DeleteAccount;
