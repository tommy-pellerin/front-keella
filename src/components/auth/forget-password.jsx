import { useState } from "react";
import { authSignInUp } from "../../services/auth-fetch.js";
// import { postData } from "../../services/data-fetch.js";
import { Link } from "react-router-dom";
import Alert from "../../styles/Alert.jsx";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await authSignInUp("/users/password", { user: { email:email } });
      if(data){
        setShowAlert(true);
        setAlertType('success'); // Set alert type to 'success'
      }
    } catch (error) {
      console.error("Error:", error);
      setShowAlert(true);
      setAlertType('error'); // Set alert type to 'error'
    }
  };

  return (
    <>
    <Alert showAlert={showAlert} setShowAlert={setShowAlert} message={alertType === 'success' ? "Vous allez recevoir un email avec un lien pour changer votre mot de pass" : "Une erreur est survenue. Veuillez recommencer"} type={alertType} />
    <div className="text-center my-5">
      <h1>Mot de passe oublié ?</h1>
      <div className="container bg-gray-200 mx-auto lg:w-3/5 my-5 border border-gray rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5 my-5">
          <div className="sm:w-full lg:w-3/5">
            <label>Email</label>
            <br />
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          <div className="w-3/5">
            <button type="submit" className="button-primary-large">Submit</button>
          </div>
        </form>
        <Link to="/sign-in" className="underline hover:no-underline">Je me connect</Link>
        <br />
        <Link to="/sign-up" className="underline hover:no-underline">Je m&apos;inscris</Link>
      </div>
    </div>
    </>
  );
}
