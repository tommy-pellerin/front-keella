import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";

export default function AuthForm({ onSubmit, buttonText }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const match = useMatch("/sign-up");
  const isSigningUp = match ? true : false;

  useEffect(()=>{console.log(isSigningUp)},[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ username, email, password });
  };

  return (
    <div className="container bg-gray-200 mx-auto lg:w-3/5 my-5 border border-gray rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5 my-5">
        {isSigningUp &&
        <div className="sm:w-full lg:w-3/5">
          <label>User name</label>
          <br />
          <input
            type="username"
            placeholder="Votre nom utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-md focus:border-purple-500 focus:outline-none"
          ></input>
        </div>
        }
        <div className="w-3/5">
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md focus:border-purple-500 focus:outline-none"
          ></input>
        </div>
        <div className="w-3/5">
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md focus:border-purple-500 focus:outline-none"
          ></input>
        </div>
        <button type="submit" className="button-primary-large">{buttonText}</button>
      </form>
    </div>
  );
}
