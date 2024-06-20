import { useState } from "react";
import { useMatch, Link } from "react-router-dom";

export default function AuthForm({ onSubmit, buttonText }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const match = useMatch("/sign-up");
  const isSigningUp = match ? true : false;

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
            className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
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
            className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
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
            className="w-full h-10 px-2 border rounded-md focus:border-purple-500 focus:outline-none"
          ></input>
        </div>
        <div className="w-3/5">
          <button type="submit" className="button-primary-large">{buttonText}</button>
        </div>
        {isSigningUp ?
          <div>
            <Link to="/sign-in" className="underline hover:no-underline">Connection</Link>
            
          </div>
          :
          <div>
            <Link to="/sign-up" className="underline hover:no-underline">S&apos;inscrire</Link>
            <br />
            <Link to="/users/forget-password" className="underline hover:no-underline">Mot de passe oublié ?</Link>
          </div>
        }
      </form>
    </div>
  );
}
