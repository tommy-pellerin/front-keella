
const Checkout = () => {

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3000/checkout/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ total: 50 })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      // Redirect to Stripe's payment page
      window.location.href = data.sessionUrl; // This should be the full URL provided by your server
    } catch (error) {
      console.error('Failed to fetch', error);
    }
  };

  return (
    <button onClick={handleCheckout}>Checkout bouton</button>
    
  )
}

export default Checkout