import axios from "axios";
import { getSessionToken } from "../../utils/storageUtils";

export const pocketmonInstance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_POKE_BASE_URL}`,
    // baseURL: "https://pokeapi.co/api/v2",
});

export const userDataInstance = axios.create({
    // baseURL: `${import.meta.env.VITE_APP_URL}`,
    baseURL: "https://topdragon.co.kr/mobithon",
    headers: {
        "Content-Type": "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiand0IiwiaWR4IjoiMmZkZDc4ZGQtYjA2Yi00YTAwLWFkNzEtOWNmNDVlNWNhMWZjIiwiaWF0IjoxNzE1MTg1NTMyLCJleHAiOjE3MTUzODU1MzJ9.bSLQJDfY8bTgyRr0ux5TVJiAvO2Vw5AVhfE4twMLgyM",
    },
    withCredentials: true,
});

userDataInstance.interceptors.request.use(
    (authData) => {
        const token = getSessionToken();
        if (token) {
            authData.headers["Authorization"] = `Bearer ${token}`;
        }
        return authData;
    },
    (error) => {
        return Promise.reject(error);
    }
);
