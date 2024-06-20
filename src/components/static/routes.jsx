import { Routes, Route } from "react-router-dom";
import SignIn from "../auth/sign-in";
import SignUp from "../auth/sign-up";
import ResetPassword from "../auth/reset-password";
import ForgetPassword from "../auth/forget-password";
import Home from "../home/Home";
import WorkoutIndex from "../workout/index";
import WorkoutShow from "../workout/show";
import FormWorkout from "../workout/form-workout";
import KitUI from "../KitUI/KitUI";
import MyAccount from "../user/my-account";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/users/password/edit" element={<ResetPassword />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/workouts" element={<WorkoutIndex />} />
      <Route path="/workouts/:workout_id" element={<WorkoutShow />} />

      <Route path="/create-workout" element={<FormWorkout />} />
      <Route path="/edit-workout/:workoutId" element={<FormWorkout />} />
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/kit-ui" element={<KitUI/>} />
    </Routes>
  );
}
