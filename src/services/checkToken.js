import { jwtDecode as realJwtDecode } from "jwt-decode";
import realCookies from "js-cookie";

export default function checkTokenExpiration(dependencies = { jwtDecode: realJwtDecode, Cookies: realCookies }) {
  console.log("token check");
  let token = dependencies.Cookies.get("keellauth"); // replace with your JWT token
  if (token) {
    token = token.replace("Bearer ", ""); // remove "Bearer " from the token
    try {
      // console.log(token);
      const decodedToken = dependencies.jwtDecode(token); // Use dependency injection
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
        return { isValid: false, reason: "expired" };
      }
    } catch (e) {
      console.error("Invalid JWT token");
      return { isValid: false, reason: "invalid" };
    }
    return { isValid: true };
  } else {
    console.error("No JWT token found");
    return { isValid: false, reason: "notFound" };
  }
}