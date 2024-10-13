import { persistor } from "./redux/store";

export const formatImageToBase64 = (data) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  persistor.pause();
  persistor.flush().then(() => {
    return persistor.purge();
  });
};
