import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SignIn from "../auth/sign-in";
import SignUp from "../auth/sign-up";
import ResetPassword from "../auth/reset-password";
import ForgetPassword from "../auth/forget-password";
import Home from "../home/Home";
import WorkoutIndex from "../workout/index";
import WorkoutShow from "../workout/show";
import FormWorkout from "../workout/form-workout";
import Profile from "../user/profile";
import OwnerRoute from "./OwnerRoute";

//Style
import KitUI from "../KitUI/KitUI";
import UserProfile from "../user/profile";

//Atom
import { useAtomValue } from 'jotai';
import { userAtom } from "../../store/user";



const PrivateRoute = ({ children }) => {

  const currentUser = useAtomValue(userAtom);
  console.log("islooged?", currentUser.isLogged);
  const location = useLocation();

  if (currentUser.isLogged) {
    return children;
  } else {
    // toast.error('You must be connected to see profile');
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
}


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/users/password/edit" element={<ResetPassword />} />
      <Route path="/users/forget-password" element={<ForgetPassword />} />
      <Route path="/profile/:user_id" element={<PrivateRoute><OwnerRoute><UserProfile/></OwnerRoute></PrivateRoute>} />

      <Route path="/workouts" element={<WorkoutIndex />} />
      <Route path="/workouts/:workout_id" element={<WorkoutShow />} />

      <Route path="/form-workout" element={<FormWorkout />} />
      <Route path="/workouts/create" element={<PrivateRoute><FormWorkout /></PrivateRoute>} />
      <Route path="/workouts/:workout_id/edit" element={<PrivateRoute><OwnerRoute><FormWorkout /></OwnerRoute></PrivateRoute>}/>

      <Route path="/kit-ui" element={<KitUI/>} />
    </Routes>
  );
}
