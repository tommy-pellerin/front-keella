# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Production environment : https://front-keella.vercel.app/
https://front-keella-361lwbkwb-tommy-pellerins-projects.vercel.app/

## How to use alert component :
in your component :

import Alert from './Alert';

// ...

const [showAlert, setShowAlert] = useState(false);
const [alertType, setAlertType] = useState('success');
// ...

in the fetch method exemple:
try {
  const data = await postData(`/reservations`,body);
  console.log(data);
  if(data){
    setShowAlert(true);
    setAlertType('success'); // Set alert type to 'success'
  }
} catch (error) {
  console.error(error);
  setShowAlert(true);
  setAlertType('error'); // Set alert type to 'error'
}


<Alert showAlert={showAlert} setShowAlert={setShowAlert} message={alertType === 'success' ? "Votre demande de réservation a été envoyé" : "Erreur lors de l'envoi de la demande de réservation"} type={alertType} />