import { Routes, Route } from "react-router-dom";
import SignIn from "../auth/sign-in";
import SignUp from "../auth/sign-up";
import Home from "../home/Home";
import WorkoutIndex from "../workout/index";
import WorkoutShow from "../workout/show";
import FormWorkout from "../workout/form-workout";
import KitUI from "../KitUI/KitUI";
import UserProfile from "../user/profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/workouts" element={<WorkoutIndex />} />
      <Route path="/workouts/:workout_id" element={<WorkoutShow />} />
      <Route path="/profile/:urlprofile" element={<UserProfile />} />

      <Route path="/form-workout" element={<FormWorkout />} />

      <Route path="/kit-ui" element={<KitUI/>} />
    </Routes>
  );
}
