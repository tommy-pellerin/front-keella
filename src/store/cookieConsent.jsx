import { useState, useEffect } from 'react';
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import { Link } from "react-router-dom";

function AskCookiesConsent() {
  const [showModal, setShowModal] = useState(false);

  const handleAccept = () => {
    setShowModal(false);
  };

  const handleDecline = () => {
    document.cookie = "myAwesomeCookiChecker=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "https://www.google.com";
    setShowModal(false);
  };

  useEffect(() => {
    const consentValue = getCookieConsentValue("myAwesomeCookiChecker");
    if (consentValue !== "true") {
      setShowModal(true);
    }
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-blue-500/50 flex justify-center items-center z-40">
      <CookieConsent
        location="bottom"
        buttonText="ACCEPTER"
        onAccept={handleAccept}
        declineButtonText="REFUSER et quitter la page"
        cookieName="myAwesomeCookiChecker"
        style={{ background: "#FFFFFF", padding: "10px" , margin: "0 10px 10px", maxWidth: "calc(100% - 20px)" }}
        expires={150}
        enableDeclineButton
        onDecline={handleDecline}
        buttonStyle={{ backgroundColor: "#4A90E2", color: "white", fontSize: "13px", borderRadius: "20px", padding: "8px 20px", }}
        declineButtonStyle={{ backgroundColor: "#f44336", color: "white", fontSize: "13px", borderRadius: "20px", padding: "8px 20px", }}
      >
        <h3 className="text-lg font-semibold">Votre vie privée</h3>
        <p className="text-sm">
          Bienvenue sur Keella ! Nous utilisons des cookies pour rendre votre visite plus agréable. Ceux-ci nous aident également à améliorer notre service! En cliquant sur &apos;ACCEPTER&apos;, vous acceptez les conditions énoncées dans notre <Link to="/terms-of-use" className="underline text-blue-500">Politique de confidentialité</Link>. {" "}
        </p>
      </CookieConsent>
    </div>
  );
}

export default AskCookiesConsent;