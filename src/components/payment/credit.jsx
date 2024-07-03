import { useEffect, useState } from "react";
import Checkout from "./checkout";
import LoadingSpinner from "../static/LoadingSpinner";
import { getData } from "../../services/data-fetch";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { Helmet } from "react-helmet";

const Credit = () => {
  const [creditToBuy, setCreditTobuy] = useState("");

  const [user] = useAtom(userAtom);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const profileData = async () => {
      try {
        const data = await getData(`/users/${user.id}`);
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    profileData();
  }, [user]);

  if (!profile) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const handleCreditInput = (e) => {
    setCreditTobuy(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Keella | Credits</title>
        <meta name="description" content="Affichage et achat de crédit" />
      </Helmet>
      <section className="container bg-gray-200 border border-gray rounded-lg mx-auto lg:w-3/5 my-5 text-center">
        <h1>Vos crédits et paiements</h1>
        <div className="p-5">
          <h3 className="text-purple-500">
            Votre crédit actuel: {profile.credit} €
          </h3>
          <div className="flex flex-col items-center space-y-5 my-5">
            <label>Acheter des credits</label>
            <input
              type="number"
              step="0.01"
              min="1"
              placeholder="Entrer un minimum de 1€"
              value={creditToBuy}
              onChange={handleCreditInput}
              className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
              required
            />
            <Checkout creditToBuy={creditToBuy} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Credit;
