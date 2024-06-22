# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Production environment : https://front-keella.vercel.app/
https://front-keella-361lwbkwb-tommy-pellerins-projects.vercel.app/

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

### checkToken function
it return 4 status possibles:
- expired :  for token expired
- valid : for token valid
- invalid : for invalid token (because wrong type of jwt or other reason that jwtDecode can't decrypt)
- not_found : there is no token in the cookies or there is no cookies with name searched