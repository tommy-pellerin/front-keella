import { Link } from "react-router-dom"
const MyAccount = () => {
  return (
    <>
      <div className="bg-blue-500 text-white text-center py-10 mb-8">
        <h1 className="text-4xl">Mon compte</h1>
      </div>
      <div className="container mx-auto my-5">
        <div className="grid grid-cols-2 gap-5 place-items-center">

          <div className="border border-purple-700 rounded-lg bg-purple-500 px-3 py-3 w-3/5 h-full">
            <Link to="/profile/me">
              <h2 className="border-b border-white">Mon profil</h2>
              <h3>Retrouver vos informations ainsi que les notes et commentaires.</h3>
              <button className="button-primary-small">Voir mon profil</button>
            </Link>
          </div>

          <div className="border border-green-700 rounded-lg bg-green-500 px-3 py-3 w-3/5 h-full">
            <Link to="">
              <h2 className="border-b border-white">Mes réservations</h2>
              <h3>Retrouver l&apos;historique de vos réservations.</h3>
              <button className="button-green-small">Voir mes réservations</button>
            </Link>
          </div>

          <div className="border border-red-700 rounded-lg bg-red-500 px-3 py-3 w-3/5 h-full">
            <Link to="#">
              <h2 className="border-b border-white">Mes annonces</h2>
              <h3>Retrouver vos l&apos;historique de vos annonces.</h3>
              <button className="button-red-small">Gérer mes annonces</button>
            </Link>
          </div>

          <div className="border border-blue-700 rounded-lg bg-blue-500 px-3 py-3 w-3/5 h-full">
            <Link to="#">
              <h2 className="border-b border-white">Paiement/Credit</h2>
              <h3>Retrouver vos paiements.</h3>
              <button className="button-no-color bg-blue-700 hover:bg-blue-800">Voir mes paiements</button>
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default MyAccount