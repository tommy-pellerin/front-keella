import { atom } from "jotai";

export const alertAtom = atom({
  showAlert:false,
  message:"",
  alertType:""
})