export function getToken() {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return null;
  }
  if (getDuration() < 0) {
    return "EXPIRED";
  }
  return token;
}
export async function rootLoader() {
  // console.log("root loader entered");
  const token = getToken();
  return { token: token };
}
export function getDuration() {
  const duration = localStorage.getItem("expirationDate");
  const expirationDate = new Date(duration);
  const now = new Date();

  const remainingTime = expirationDate.getTime() - now.getTime();
  return remainingTime;
}
