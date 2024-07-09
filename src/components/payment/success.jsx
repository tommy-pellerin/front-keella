import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../static/LoadingSpinner";
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

import { BASE_URL } from "../../services/config-fetch";
import { Helmet } from "react-helmet";


const Success = () => {
  const [session, setSession] = useState(null);
  const token = Cookies.get("keellauth");
  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchCreditUser = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const session_id = urlParams.get('session_id');
      const session_token = urlParams.get('session_token');
      try {

        const url = BASE_URL + "/checkout/success";
        // const url = "https://back-keella.fly.dev/checkout/success"
      // const url = "http://localhost:3000/checkout/success"

        const response = await fetch(url, {
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
        setSession(data);
        toast.success("Merci !");
      } catch (error) {
        // console.error('Fetch error: ', error);
        if (error.response) {
          // console.error(error.response);
          error.response.json().then((body) => {
            // console.error('Erreur du serveur:', body.error);
            toast.error(`${body.error}`);
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
      <Helmet>
        <title>Keella | Paiement réussie</title>
        <meta name="description" content="Paiement réussie" />
      </Helmet>
      <section className="bg-green-500 py-5 text-center">
        <h1 className="text-light">Succès</h1>
      </section>
      <div className="container mx-auto text-center my-5"> 
        <h2>Le paiement c&apos;est bien déroulé </h2> 
        <p>Nous avons bien reçu votre paiement de {session.credit_amount}€</p> 
        <p>Le statut de votre paiement est : {session.payment_intent_status}</p> 
          <Link to="/workouts" className="button-green-small">Réservez un entrainement</Link>
          <Link to="/" className="button-primary-small">Retourner a l&apos;accueil</Link>
      </div>
    </>
  )
}

export default Success