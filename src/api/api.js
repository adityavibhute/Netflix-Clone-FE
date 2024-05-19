import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const API_KEY = "98ee6ed6cd75ae1b0a841a3b465a863d";
const USER_API = "http://localhost:3001";

const endpoints = {
    originals: "/discover/tv",
    trending: "/trending/all/week",
    now_playing: "/movie/now_playing",
    popular: "/movie/popular",
    top_rated: "/movie/top_rated",
    upcoming: "/movie/upcoming",
};

export const fetchData = (param) => {
    return axios.get(`${URL}${endpoints[param]}?api_key=${API_KEY}`)
}

export const logoutUser = (token, sessionID) => {
    return axios({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'post',
        url: `${USER_API}/api/v1/users/logout`,
        data: {
            sessionID: sessionID,
        },
        withCredentials: true
    });
}

export const loginUser = (param) => {
    return axios({
        method: 'post',
        url: `${USER_API}/api/v1/users/login`,
        data: {
            emailid: param?.email,
            password: param?.password
        },
        withCredentials: true
    });
}

export const signupUser = (param) => {
    return axios({
        method: 'post',
        url: `${USER_API}/api/v1/users/signup`,
        data: {
          emailid: param?.email,
          password: param?.password
        }
      })
}