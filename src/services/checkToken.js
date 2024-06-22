import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export default function checkTokenExpiration() {
  console.log("token check");
  let token = Cookies.get("keellauth"); // replace with your JWT token
  if (token) {
    token = token.replace("Bearer ", ""); // remove "Bearer " from the token
    try {
      // console.log(token);
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken);
      const dateNow = new Date();
      // const expirationDate = new Date(decodedToken.exp * 1000); // convert to milliseconds
      // console.log(`Token expiration date: ${expirationDate.toLocaleString()}`);

      if (decodedToken.exp < dateNow.getTime() / 1000) {
        console.log("token expired");
        //can use if we want to clear cookies and local storage before signIn
        // const local = localStorage.getItem("user")
        // Cookies.remove("keellauth");
        // if(local){
        //   localStorage.removeItem("user")
        // }
        return true
      }
    } catch (e) {
      console.error("Invalid JWT token");
      return true
    }
  } else {
    console.error("No JWT token found");
    // setIsTokenExpired(true); // I mute this because if there is no token does not mean that the token expired
  }
  return false
};