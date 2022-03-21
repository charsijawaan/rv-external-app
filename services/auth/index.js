import useAxios from "../../hooks/useAxios";

const axios = useAxios();

export const registerCamper = async (data) => {
  try {
    return await axios.post("/auth/register_camper", data);
  } catch (err) {
    return err.response;
  }
};

export const loginCamper = async (data) => {
  try {
    return await axios.post("/auth/login_camper", data);
  } catch (err) {
    return err.response;
  }
};

export const generateOTP = async (data) => {
  try {
    return await axios.post("/auth/generate_otp", data);
  } catch (err) {
    return err.response;
  }
};
export const resetPassword = async (data) => {
  console.log("data from services", data);
  try {
    return await axios.post("/auth/verify_otp", data);
  } catch (err) {
    return err.response;
  }
};
