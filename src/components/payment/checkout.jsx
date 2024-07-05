import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/config-fetch";
//atom
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";

//security
import checkTokenAndLocalStorage from "../../services/checkTokenAndLocalStorage";

const Checkout = ({creditToBuy}) => {
  //use atom
  const [user, setUser] = useAtom(userAtom);
  const token = Cookies.get("keellauth");
  const navigate = useNavigate();
  
  const handleCheckout = async () => {
    if(creditToBuy < 1){
      toast.error("La somme à recharger doit être au moins de 1€.")
      return
    }
    //check token expiration
    const tokenStatus = checkTokenAndLocalStorage(user, setUser, navigate);
    //if tokenStatus = true means token is not expired or invalid
    if (!tokenStatus) {
      return;
    }
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to proceed with the checkout?");
    if (!isConfirmed) {
      return; // Exit the function if the user cancels
    }
    try {
      // Use Vite environment variable for BASE_URL
      const url = BASE_URL + "/checkout/create";
      // const url = "https://back-keella.fly.dev/checkout/create"
      // const url = "http://localhost:3000/checkout/create"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ total: creditToBuy })
      });
      if (!response.ok) {
        if (response.status === 401) {
          // Use React Router for redirection
          toast.error('Vous devez etre connecté');
        } else {
          throw new Error('Network response was not ok');
        }
      }
      const data = await response.json();
      // Redirect to Stripe's payment page
      window.location.href = data.sessionUrl; // This should be the full URL provided by your server
    } catch (error) {
      // console.error('Error caught in calling function:', error);
        if (error.response) {
          error.response.json().then((body) => {
            // console.error('Erreur du serveur:', body.error);
            toast.error(body.error);
          });
        }
    }
  };

  return (
    <button onClick={handleCheckout} className="button-primary-large">Passer au paiement</button>
  )
}

export default Checkout