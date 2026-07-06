import api from "../api/axios";

export const login = async (userData) => {
  const { data } = await api.post("/auth/login", userData);
  return data;
};

const getToken = () => {
    return localStorage.getItem("token")
};

const getRole = () => {
    return localStorage.getItem("role")
};

const getName = () => {
    return localStorage.getItem("name")
};
const saveUser =(token , role , name) =>{
    localStorage.setItem("token" , token);
    localStorage.setItem("role" , role);
    localStorage.setItem("name" , name);
    
};

const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

}


export { getToken, getRole, getName, saveUser, logout };
