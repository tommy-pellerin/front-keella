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
import Success from "../payment/success";
import Cancel from "../payment/cancel";

//protection
import PrivateRoute from "../../services/privateRoute";
import OwnerRoute from "./OwnerRoute";
import ProfileReservation from '../user/profileReservation'
import Category from "../category/category";

//Style
import KitUI from "../KitUI/KitUI";
import MyAccount from "../user/my-account";



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
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/my-reservation/:user_id" element={<ProfileReservation />} />

      
      <Route path="/workouts" element={<WorkoutIndex />} />
      <Route path="/workouts/:workout_id" element={<WorkoutShow />} />

      <Route path="/form-workout" element={<FormWorkout />} />
      <Route path="/workouts/create" element={<PrivateRoute><FormWorkout /></PrivateRoute>} />
      <Route path="/workouts/:workout_id/edit" element={<PrivateRoute><OwnerRoute><FormWorkout /></OwnerRoute></PrivateRoute>}/>
      
      <Route path="/payment/success" element={<Success />} />
      <Route path="/payment/cancel" element={<Cancel />} />

      {/* Il faut etre admin pour utiliser ses pages */}
      <Route path="/categories" element={<PrivateRoute><Category/></PrivateRoute>} />
      <Route path="/categories/edit" element={<KitUI/>} />
      <Route path="/kit-ui" element={<KitUI/>} />
    </Routes>
  );
}
