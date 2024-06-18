import { Routes, Route } from "react-router-dom";
import SignIn from "../auth/sign-in";
import SignUp from "../auth/sign-up";
import SignOut from "../auth/sign-out";
import WorkoutIndex from "../workout/index";
import FormWorkout from "../workout/form-workout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-out" element={<SignOut />} />
      <Route path="/workouts" element={<WorkoutIndex />} />
      <Route path="/form-workout" element={<FormWorkout />} />
    </Routes>
  );
}
