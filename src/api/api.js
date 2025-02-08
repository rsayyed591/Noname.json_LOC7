import axios from 'axios'

export const ngrok_url = 'https://05a5-14-139-125-227.ngrok-free.app'
const api = axios.create({
  baseURL: `${ngrok_url}/`,
  headers: {
      'Content-Type': 'application/json',
  },
});

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;


const APIservice = {
  registerUser: (data) =>
    api.post("/auth/register_user",data,  {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  loginUser: (data) =>
    api.post("/auth/login_user", data, {
      headers: {
       "Content-Type": "application/json",
      },
    }),
  profileDataDonor: (data,token) =>
    api.post("profile/create_donor_profile", data, {
      headers: {
        "Authorization": `Bearer ${token}`,
       "Content-Type": "application/json",
      },
    }),
  profileDataNGO: (data,token) =>
    api.post("profile/create_ngo_profile", data, {
      headers: {
        "Authorization": `Bearer ${token}`,
       "Content-Type": "multipart/form-data",
      },
    })
  }

  export default APIservice;