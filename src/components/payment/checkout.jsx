import Cookies from "js-cookie";

const Checkout = ({creditToBuy}) => {
  const token = Cookies.get("keellauth");

  const handleCheckout = async () => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to proceed with the checkout?");
    if (!isConfirmed) {
      console.log("Checkout cancelled by user.");
      return; // Exit the function if the user cancels
    }
    try {
      const url = "https://back-keella.fly.dev/checkout/create"
      // const url = "http://localhost:3000/checkout/create"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ total: creditToBuy })
      });
      console.log(response);
      if (!response.ok) {
        if (response.status === 401) {
          // Use React Router for redirection
          console.error('User must be signed in');
        } else {
          throw new Error('Network response was not ok');
        }
      }
      const data = await response.json();
      console.log(data);
      // Redirect to Stripe's payment page
      window.location.href = data.sessionUrl; // This should be the full URL provided by your server
    } catch (error) {
      console.error('Error caught in calling function:', error);
        if (error.response) {
          console.log(error.response);
          error.response.json().then((body) => {
            console.error('Erreur du serveur:', body.error);
          });
        }
    }
  };

  return (
    <button onClick={handleCheckout} className="button-primary-large">Passer au paiement</button>
  )
}

export default Checkout