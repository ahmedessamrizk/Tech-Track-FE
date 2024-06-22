import { redirect } from "react-router-dom";
import { getToken } from "../../utils/tokenFunctions";

const withAuth = (loader) => async (args) => {
  const token = !!getToken();

  if (!token) {
    return redirect("/login");
  }

  return loader ? await loader(args) : null;
};

export default withAuth;

export const withRole = (loader, allowedRoles) => async (args) => {
  const token = !!getToken();

  if (!token) {
    return redirect("/login");
  } else {
    const userRole = JSON.parse(localStorage.getItem("userRole"));
    if (!allowedRoles.includes(userRole)) {
      return redirect("/");
    }

    return loader ? await loader(args) : null;
  }
};
