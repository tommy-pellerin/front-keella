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

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/workouts" element={<WorkoutIndex />} />
      <Route path="/workouts/:workout_id" element={<WorkoutShow />} />

      <Route path="/form-workout" element={<FormWorkout />} />

      <Route path="/kit-ui" element={<KitUI/>} />
    </Routes>
  );
}
