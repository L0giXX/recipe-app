import { toast } from "react-toastify";

export default function toastHandler() {
  toast("Login successful!", {
    theme: "light",
    type: "success",
    autoClose: 1000,
  });
}
