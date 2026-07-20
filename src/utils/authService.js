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

const getEmail = () => {
    return localStorage.getItem("email")
};

const saveUser =(token , role , name, email) =>{
    localStorage.setItem("token" , token);
    localStorage.setItem("role" , role);
    localStorage.setItem("name" , name);
    localStorage.setItem("email" , email);
    
};

const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
}


export { getToken, getRole, getName, getEmail, saveUser, logout };
