# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Production environment : https://front-keella.vercel.app/
https://front-keella-pdzqxo5vb-tommy-pellerins-projects.vercel.app/

## How to use alert component :
in your component :
import { useAtom } from "jotai";
import { alertAtom } from "../../store/alert";

// ...

const [,setAlert] = useAtom(alertAtom);
// ...

in the fetch method exemple:
try {
      const user = await authSignInUp("/users/sign_in", {
        user: { email, password },
      });
      if(user){
        setAlert({
          showAlert:true,
          message:"Bonjour, nous somme ravis de vous revoir !",
          alertType:"success"
        })
      }
      setUser({
        email: user.user.email,
        isLogged: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error); 
      setAlert({
        showAlert:true,
        message:"Une erreur est survenue. Veuillez vérifier votre email et mot de passe",
        alertType:"error"
      })
    }

### is it normal that when i refresh page in vercel other than the root page i got his error ? 404: NOT_FOUND Code: NOT_FOUND ID: cdg1::xfwgq-1718915331464-5d24fd65d6ad

Yes, this is a common issue when deploying single-page applications (SPAs) like those created with React, Vue, or Angular on platforms like Vercel or Netlify.

In a SPA, routing is handled by the client-side JavaScript, not by the server. When you refresh a page, the request goes to the server, which doesn't have a matching route, hence the 404 error.

To fix this, you need to set up a catch-all route on the server that serves your index.html file, which then allows the client-side JavaScript to handle the routing.

For Vercel, you can create a vercel.json file in the root of your project with the following content:
{
    "rewrites": [
        {"source": "/(.*)", "destination": "/"}
    ]
}

This configuration tells Vercel to redirect all requests to your index.html file, allowing the client-side router to correctly handle the route. After adding this file, you'll need to redeploy your application for the changes to take effect.
