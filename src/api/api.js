import axios from 'axios'

export const ngrok_url = 'https://43d4-14-139-125-227.ngrok-free.app'
const api = axios.create({
  baseURL: `${ngrok_url}/`,
  headers: {
      'Content-Type': 'application/json',
  },
});
export const ngrok_url2="https://4c02-14-139-125-227.ngrok-free.app"
const api2 = axios.create({
  baseURL: `${ngrok_url2}/`,
  headers: {
      'Content-Type': 'application/json',
  },
});

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const ngotoken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoibmdvIiwidXNlcl9pZCI6IjE3ODU4NTBmLTliMTAtNDI3Mi04MzY1LWExNzBhNTliNDFkZCIsImlhdCI6MTczOTA2MzkwMSwiZXhwIjoxNzQxNjU1OTAxfQ.WTSZNmeh_pv5sE_SE-zgU5qN0vo1Qx0e8_yxdLH32dw'
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
       "Content-Type": "multipart/form-data",
      },
    }),
  profileDataNGO: (data,token) =>
    api.post("profile/create_ngo_profile", data, {
      headers: {
        "Authorization": `Bearer ${token}`,
       "Content-Type": "multipart/form-data",
      },
    }),
  foodDonationAdd: (data) =>
    api.post("donation/create_donation", data, {
      headers: {
        "Authorization": `Bearer ${token}`,
       "Content-Type": "multipart/form-data",
      },
    }),
  deliveryAgentAdd: (data) =>
    api.post("delivery_partner/add", data, {
      headers: {
        "Authorization": `Bearer ${ngotoken}`,
        "Content-Type": "application/json",
      },
    }),
  getDonations: (data) =>
    api2.post("donations/nearby", data, {
      headers: {
        "Authorization": `Bearer ${ngotoken}`,
       "Content-Type": "application/json",
      },
    }),
  }

  export default APIservice;