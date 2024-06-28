import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import DeleteAccount from "./delete-account";

const MyAccount = () => {
  const [user] = useAtom(userAtom);

  return (
    <>
      <div className="background-blue-500">
        <h1 className="text-4xl">Mon compte</h1>
      </div>
      <div className="container mx-auto my-5">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-5 place-items-center">
          <Link
            to={`/profile/${user.id}`}
            className="border border-purple-700 rounded-lg bg-purple-500 hover:bg-purple-800 px-3 py-3 w-3/5 sm:h-52 lg:h-44"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="border-b border-white text-white">Mon profil</h2>
              <h3>
                Retrouver vos informations ainsi que les notes et commentaires.
              </h3>
            </div>
          </Link>

          <Link
            to={`/my-account/${user.id}/my-reservation`}
            className="border border-green-700 rounded-lg bg-green-500 hover:bg-green-800 px-3 py-3 w-3/5 sm:h-52 lg:h-44"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="border-b border-white text-white">
                Mes réservations
              </h2>
              <h3>Retrouver l&apos;historique de vos réservations.</h3>
            </div>
          </Link>

          <Link
            to={`/my-account/${user.id}/hosted_workouts`}
            className="border border-red-700 rounded-lg bg-red-500 hover:bg-red-800 px-3 py-3 w-3/5 sm:h-52 lg:h-44"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="border-b border-white text-white">Mes annonces</h2>
              <h3>Retrouver l&apos;historique de vos annonces.</h3>
            </div>
          </Link>

          <Link
            to="/payment/credit"
            className="border border-blue-700 rounded-lg bg-blue-500 hover:bg-blue-800 px-3 py-3 w-3/5 sm:h-52 lg:h-44"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="border-b border-white text-white">
                Paiement/Credit
              </h2>
              <h3>Retrouver vos paiements.</h3>
            </div>
          </Link>
          <DeleteAccount />
        </div>
      </div>
    </>
  );
};

export default MyAccount;
