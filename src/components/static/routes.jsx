//import
import { Routes, Route, useNavigate } from "react-router-dom";
import SignIn from "../auth/sign-in";
import SignUp from "../auth/sign-up";
import ResetPassword from "../auth/reset-password";
import ForgetPassword from "../auth/forget-password";
import Home from "../home/Home";
import WorkoutIndex from "../workout/index";
import WorkoutShow from "../workout/show";
import FormWorkout from "../workout/form-workout";
import Profile from "../user/profile";
import EditProfile from "../user/editProfile";
import MyAccount from "../user/my-account";
import HostedWorkoutHistory from "../user/HostedWorkoutHistory";
import Success from "../payment/success";
import Cancel from "../payment/cancel";
import TermsOfUse from "./termsOfUse";
import Credit from "../payment/credit";
import LegalNotices from "./legalNotices";
import PrivacyPolicy from "./privacyPolicy";
import Help from "./help";
import ProfileReservation from '../user/profileReservation'
import Category from "../category/category";
import { useEffect } from "react";

//protection
import PrivateRoute from "../../services/privateRoute";
import OwnerRoute from "./OwnerRoute";
import checkTokenExpiration from "../../services/checkToken";

//Style
import KitUI from "../KitUI/KitUI";

import { useAtom } from "jotai";
import { alertAtom } from "../../store/alert";
import { userAtom } from "../../store/user";

export default function AppRoutes() {
  const navigate = useNavigate();
  const [,setAlert] = useAtom(alertAtom);
  const [user, setUser] = useAtom(userAtom);

  const checkTokenAndLocalStorage = () =>{
    const tokenStatus = checkTokenExpiration();
    if(tokenStatus.isValid){
      console.log("Token is valid");
      return
    } else {
      if (tokenStatus.reason === "notFound") {
        // Check if user data is in local storage and seems valid
        const localUserData = localStorage.getItem("user");
        if (localUserData) {
          setUser({ id: "", email: "", isLogged: false });
          console.log("local storage present but token not found");
          setAlert({
            showAlert: true,
            message: "Votre connection a expiré, veuillez vous reconnecter",
            alertType: "warning"
          });
          navigate("/sign-in");
          return
        }
      } else {
        // For expired or invalid token
        console.log("token expired or invalid");
        setAlert({
          showAlert: true,
          message: "Votre connection a expiré, veuillez vous reconnecter",
          alertType: "warning"
        });
        navigate("/sign-in");
        return
      }
    }
  }
  
  useEffect(() => {
    checkTokenAndLocalStorage()
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/users/password/edit" element={<ResetPassword />} />
      <Route path="/users/forget-password" element={<ForgetPassword />} />
      <Route path="/profile/:user_id" element={<PrivateRoute><Profile/></PrivateRoute>} />
      <Route path="/profile/:user_id/edit" element={<PrivateRoute><OwnerRoute><EditProfile/></OwnerRoute></PrivateRoute>} />
      <Route path="/my-account" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
      <Route path="/my-reservation/:user_id" element={<PrivateRoute><ProfileReservation /></PrivateRoute>} />

      <Route path="/my-account/:user_id/hosted_workouts" element={<PrivateRoute><HostedWorkoutHistory/></PrivateRoute>} />
      <Route path="/workouts" element={<WorkoutIndex />} />
      <Route path="/workouts/:workout_id" element={<WorkoutShow />} />

      <Route path="/workouts/create" element={<PrivateRoute><FormWorkout /></PrivateRoute>} />
      <Route path="/workouts/:workout_id/edit" element={<PrivateRoute><OwnerRoute><FormWorkout /></OwnerRoute></PrivateRoute>}/>
      
      <Route path="/payment/success" element={<PrivateRoute><Success /></PrivateRoute>} />
      <Route path="/payment/cancel" element={<PrivateRoute><Cancel /></PrivateRoute>} />
      <Route path="/payment/credit" element={<PrivateRoute><Credit /></PrivateRoute>} />
      
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/legal-notices" element={<LegalNotices />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/help" element={<Help />} />

      {/* Il faut etre admin pour utiliser ses pages */}
      <Route path="/categories" element={<PrivateRoute><Category/></PrivateRoute>} />
      <Route path="/kit-ui" element={<PrivateRoute><KitUI/></PrivateRoute>} />
    </Routes>
  );
}
