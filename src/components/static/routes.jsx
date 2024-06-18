import { Routes, Route } from "react-router-dom";
import SignIn from "../auth/sign-in";
import SignUp from "../auth/sign-up";
import SignOut from "../auth/sign-out";
import Home from "../home/Home";
import WorkoutIndex from "../workout/index";
import FormWorkout from "../workout/form-workout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-out" element={<SignOut />} />
      <Route path="/workouts" element={<WorkoutIndex />} />
      <Route path="/create-workout" element={<FormWorkout />} />
      <Route path="/edit-workout/:workoutId" element={<FormWorkout />} />
    </Routes>
  );
}
