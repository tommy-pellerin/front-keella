import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
const Cancel = () => {
  return(
    <>
      <Helmet>
        <title>Keella | Echec de paiement</title>
        <meta name="description" content="Echec de paiement" />
      </Helmet>
      <section className="bg-red-500 py-5 text-center">
        <h1 className="text-light">Echec</h1>
      </section>
      <div className="container mx-auto text-center my-5"> 
        <h2>Le paiement n&apos;a pas abouti.</h2> 
        <p>Aucun prélèvement ne sera fait sur votre compte</p> 
        <Link to="/payment/credit" className="button-green-small">Retourner à paiement/credit</Link>
        <Link to="/" className="button-primary-small">Retourner à l&apos;accueil</Link>
      </div>
    </>
  )
}

export default Cancel