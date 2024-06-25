import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../static/LoadingSpinner";
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { alertAtom } from "../../store/alert";

const Success = () => {
  const [session, setSession] = useState(null);
  const token = Cookies.get("keellauth");
  const navigate = useNavigate();
  const [,setAlert] = useAtom(alertAtom);
  useEffect(() => {
    
    const fetchCreditUser = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const session_id = urlParams.get('session_id');
      const session_token = urlParams.get('session_token');
      // console.log(session_id);
      // console.log(session_token);
      try {
        const response = await fetch(`http://localhost:3000/checkout/success`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          body: JSON.stringify(
            {checkout:
              { 
              session_id: session_id,
              session_token: session_token
              }
            })
        });
        //Si fetch ne rejette pas automatiquement les réponses non-OK (ce qui est le comportement par défaut), vous devrez ajuster votre gestion des erreurs pour inclure la réponse dans l'objet d'erreur que vous lancez.
        if (!response.ok) {
          const error = new Error(`HTTP error! status: ${response.status}`);
          error.response = response; // Attache la réponse à l'objet d'erreur
          throw error;
        }
        const data = await response.json();
        console.log(data);
        setSession(data);
        console.log();
      } catch (error) {
        console.log('Fetch error: ', error);
        if (error.response) {
          console.log(error.response);
          error.response.json().then((body) => {
            console.error('Erreur du serveur:', body.error);
            setAlert({
              showAlert:true,
              message: `${body.error}`,
              alertType:"error"
            })
          });
        }
        navigate("/payment/credit");
      }
    };

    fetchCreditUser();
  }, []);

  if (!session) {
    return <LoadingSpinner />
  }

  return(
    <>
      <section className="bg-green-500 py-5 text-center">
        <h1 className="text-light">Succès</h1>
      </section>
      <div className="container mx-auto text-center my-5"> 
        <h2>Le paiement c&apos;est bien déroulé </h2> 
        <p>Nous avons bien reçu votre paiement de {session.credit_amount}€</p> 
        <p>Le statut de votre paiement est : {session.payment_intent_status}</p> 
          <Link to="/workouts" className="button-green-small">Réservez un Entrainement</Link>
          <Link to="/" className="button-primary-small">Retourner a l&apos;accueil</Link>
      </div>
    </>
  )
}

export default Success