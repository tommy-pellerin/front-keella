//import
import { Routes, Route} from "react-router-dom";
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

//protection
import PrivateRoute from "../../services/privateRoute";
import OwnerRoute from "./OwnerRoute";
import ProfileReservation from '../user/profileReservation'
import Category from "../category/category";

//Style
import KitUI from "../KitUI/KitUI";



export default function AppRoutes() {
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

      <Route path="/form-workout" element={<FormWorkout />} />
      <Route path="/workouts/create" element={<PrivateRoute><FormWorkout /></PrivateRoute>} />
      <Route path="/workouts/:workout_id/edit" element={<PrivateRoute><OwnerRoute><FormWorkout /></OwnerRoute></PrivateRoute>}/>
      
      <Route path="/payment/success" element={<Success />} />
      <Route path="/payment/cancel" element={<Cancel />} />
      <Route path="/payment/credit" element={<Credit />} />
      
      <Route path="/terms-of-use" element={<TermsOfUse />} />

      {/* Il faut etre admin pour utiliser ses pages */}
      <Route path="/categories" element={<PrivateRoute><Category/></PrivateRoute>} />
      <Route path="/categories/edit" element={<KitUI/>} />
      <Route path="/kit-ui" element={<KitUI/>} />
    </Routes>
  );
}
