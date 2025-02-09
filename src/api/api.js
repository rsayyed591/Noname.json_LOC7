import axios from 'axios'

export const ngrok_url = 'https://4da8-14-139-125-227.ngrok-free.app'
const api = axios.create({
  baseURL: `${ngrok_url}/`,
  headers: {
      'Content-Type': 'application/json',
  },
});
export const ngrok_url2="https://c103-14-139-125-227.ngrok-free.app"
const api2 = axios.create({
  baseURL: `${ngrok_url2}/`,
  headers: {
      'Content-Type': 'application/json',
  },
});

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const ngotoken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoibmdvIiwidXNlcl9pZCI6IjE3ODU4NTBmLTliMTAtNDI3Mi04MzY1LWExNzBhNTliNDFkZCIsImlhdCI6MTczOTA2MzkwMSwiZXhwIjoxNzQxNjU1OTAxfQ.WTSZNmeh_pv5sE_SE-zgU5qN0vo1Qx0e8_yxdLH32dw'
const donortoken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoicmVzdGF1cmFudCIsInVzZXJfaWQiOiJhMTkzNThhNi1kMDU2LTQ5NzgtYmM0YS1lMjI0NTg0ZTE1MDUiLCJpYXQiOjE3MzkwNzEwMjEsImV4cCI6MTc0MTY2MzAyMX0.-106m3I7hze_nfzi3006DEQMxZJR2qUVqajqW1iXPcg'
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
        "Authorization": `Bearer ${donortoken}`,
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
  listDeliveryAgents: () =>
    api.post("delivery_partner/get_partners","", {
      headers: {
        "Authorization": `Bearer ${ngotoken}`,
       "Content-Type": "application/json",
      },
    }),
  detailsDonations: (orderid) =>
    api.get("donation/get_details/"+orderid, {
      headers: {
        "Authorization": `Bearer ${ngotoken}`,
       "ngrok-skip-browser-warning": "69420"
      },
    }),
  }

  export default APIservice;