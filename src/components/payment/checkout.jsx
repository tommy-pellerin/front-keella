import PrivateRoute from "../../services/privateRoute";

const Checkout = () => {

  const handleCheckout = async () => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to proceed with the checkout?");
    if (!isConfirmed) {
      console.log("Checkout cancelled by user.");
      return; // Exit the function if the user cancels
    }
    try {
      const response = await fetch("http://localhost:3000/checkout/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ total: 50 })
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
            // setAlert({
            //   showAlert:true,
            //   message: `${body.error}`,
            //   alertType:"error"
            // })
          });
        }
    }
  };

  return (
    
      <button onClick={handleCheckout}>Checkout bouton</button>
   
    
  )
}

export default Checkout