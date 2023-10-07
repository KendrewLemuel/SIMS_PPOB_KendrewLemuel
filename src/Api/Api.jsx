import axios from "axios";

const token = sessionStorage.getItem("tokenId");

//Profile API

export const profileList = () => {
  const axiosInstance = axios.create({
    baseURL: "https://take-home-test-api.nutech-integrasi.app",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  return axiosInstance.get("/profile");
};

//services API

export const servicesList = () => {
  const axiosInstance = axios.create({
    baseURL: "https://take-home-test-api.nutech-integrasi.app",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  return axiosInstance.get("/services");
};

//banner API

export const bannerList = () => {
  const axiosInstance = axios.create({
    baseURL: "https://take-home-test-api.nutech-integrasi.app",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  return axiosInstance.get("/banner");
};
//profile API

export const profileData = () => {
  const axiosInstance = axios.create({
    baseURL: "https://take-home-test-api.nutech-integrasi.app",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  return axiosInstance.get("/profile");
};
//balance API

export const balanceData = () => {
  const axiosInstance = axios.create({
    baseURL: "https://take-home-test-api.nutech-integrasi.app",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  return axiosInstance.get("/balance");
};

//transaction API

export const transactionData = (offset = 0, limit = 5, token) => {
  const axiosInstance = axios.create({
    baseURL: "https://take-home-test-api.nutech-integrasi.app",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance.get(
    `/transaction/history?offset=${offset}&limit=${limit}`
  );
};
