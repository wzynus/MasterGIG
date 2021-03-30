/* eslint camelcase: 0 */


import axios from 'axios';


const API_URL = "http://localhost:5000/api";


export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}


const tokenConfig = (token) => ({
    headers: {
        'Authorization': token, // eslint-disable-line quote-props
    },
});

export function validate_token(token) {
    return axios.post('/api/is_token_valid', {
        token,
    });
}

export function get_github_access() {
    window.open(
        '/github-login',
        '_blank' // <- This is what makes it open in a new window.
    );
}



export function get_token(email, password) {
    return axios.post('/api/get_token', {
        email,
        password,
    });
}

export function has_github_token(token) {
    return axios.get('/api/has_github_token', tokenConfig(token));
}

export function data_about_user(token) {
    return axios.get('/api/user', tokenConfig(token));
}

export const register = newUser => {
    return axios
    .post(API_URL + '/users/register', {
      email: newUser.email,
      password: newUser.password,
      username: newUser.username,
      bio: newUser.bio,
      dob: newUser.dob
    })
    .then(res => {
      console.log(res)
   
    });
  }

  export const logout =()=>{ localStorage.remove('usertoken') };

  export const getCurrentUser = ()=>{
    return JSON.parse(localStorage.getItem('usertoken'))
  };
  
  
  export const login = user => {
    return axios
    .post(API_URL + '/users/login', {
      email: user.email,
      password: user.password,
  
    })
    .then(res => {
      localStorage.setItem('usertoken', res.data.token)
      return res.data
    })
    .catch(err => {
      console.log(err)
    });
  }
  
