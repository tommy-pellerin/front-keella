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
import PageNotFound from "./pageNotFound";

//protection
import PrivateRoute from "../../services/privateRoute";
import OwnerRoute from "./OwnerRoute";
import checkTokenAndLocalStorage from "../../services/checkTokenAndLocalStorage";
import AdminRoute from "../../services/adminRoute";

//Style
import KitUI from "../KitUI/KitUI";

import { useAtom } from "jotai";
import { userAtom } from "../../store/user";


export default function AppRoutes() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  
  useEffect(() => {
    checkTokenAndLocalStorage(user, setUser, navigate)
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
      <Route path="/my-account/:user_id/my-reservation" element={<PrivateRoute><OwnerRoute><ProfileReservation /></OwnerRoute></PrivateRoute>} />
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
      <Route path="/categories" element={<AdminRoute><Category/></AdminRoute>} />
      <Route path="/kit-ui" element={<AdminRoute><KitUI/></AdminRoute>} />

      <Route path="*" element={<PageNotFound />}/>
    </Routes>
  );
}
