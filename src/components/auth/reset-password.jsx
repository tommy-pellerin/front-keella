import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authPatch } from "../../services/auth-fetch.js";
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetPasswordToken = queryParams.get("reset_password_token");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authPatch("/users/password", {
        user: {
          reset_password_token: resetPasswordToken,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      });
      if(data){
        toast.success("Votre mot de passe a été enregistré avec success !");
      }
      navigate("/sign-in");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Une erreur est survenue. Veuillez recommencer");
    }
  };

  return (
    <>
    <div className="text-center my-5">
      <h1>Changement de mot de passe</h1>
      <div className="container bg-gray-200 mx-auto lg:w-3/5 my-5 border border-gray rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5 my-5">
          <div className="sm:w-full lg:w-3/5">
            <label>Nouveau mot de pass</label>
            <br />
            <input
              type="password"
              placeholder="Votre nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          <div className="sm:w-full lg:w-3/5">
            <label>Confirmer mot de passe</label>
            <br />
            <input
              type="password"
              placeholder="Confirmez votre nouveau mot de passe"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          <div className="w-3/5">
            <button type="submit" className="button-primary-large">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
