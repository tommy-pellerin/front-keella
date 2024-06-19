import { useState } from "react";
import { postData } from "../../services/data-fetch.js";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postData("users/password", { user: { email } });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-center my-5">
      <h1>Mot de pass oublié ?</h1>
      <div className="container bg-gray-200 mx-auto lg:w-3/5 my-5 border border-gray rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5 my-5">
          <div className="sm:w-full lg:w-3/5">
            <label>Email</label>
            <br />
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          <div className="w-3/5">
            <button type="submit" className="button-primary-large">Submit</button>
          </div>
        </form>
        <Link className="underline hover:no-underline">Je me connect</Link>
        <br />
        <Link className="underline hover:no-underline">Je m&apos;inscris</Link>
      </div>
    </div>
  );
}
