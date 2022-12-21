import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3003";

const UserContext = createContext({
  user: null,
  loading: false,
  register: async () => false, // 500
  login: async () => false, // 500
  logout: () => null,
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(""); // -> TODO: Korrektur || funktioniert noch nicht, message wird beim erstellen nicht angezeigt
  // const [status, setStatus] = useState([]); oder array ?? -> TODO: Korrektur || funktioniert noch nicht, message wird beim erstellen nicht angezeigt

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => setUser(response.data))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const exportData = {
    user: user,
    loading: loading,
    register: async (name, email, password, birthday) => {
      const response = await axios
        .post("/user/register", { name, email, password })
        .catch((err) => err.response);

      const msgStatus = response.data.msg;
      const msg = Object.values(response.data.message[0]);
      //  ZUM TESTEN
      // console.log("response", response);
      // console.log("response", response.data);
      // console.log("response", response.data.msg);
      // console.log("status-msg", msgStatus);

      // // console.log("error", response.data.message[0]);
      // console.log("error-msg", msg[0]);

      response.status === 200 ? true : false;
      response.status === 201
        ? setStatus(msgStatus) // -> TODO: Korrektur || wird beim Erstellen eines NEUEN Users nicht angezeigt
        : setStatus("Etwas ist schief gelaufen");
      response.status === 400
        ? setErrors(msg[0]) //  -> TODO: Korrektur || funktioniert gut, Message bleibt nach Korrektur aber noch stehen
        : setErrors("Etwas ist schief gelaufen");
    },
    // login: async(), //  -> TODO: Korrektur || LOGIN implementieren
    // logout: async(), //  -> TODO: Korrektur || LOGOUT implementieren
    errors,
    setErrors,
    status,
  };

  return (
    <UserContext.Provider value={exportData}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

export default function useUser() {
  return useContext(UserContext);
}
