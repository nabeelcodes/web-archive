import { useSession } from "next-auth/react";
import apiEndpoints from "@/data/apiEndpoints";

// react hook to verify client side token with backend
export const useVerifyToken = () => {
  // getting current session from browser
  const session = useSession();

  const verifyToken = async () => {
    // getting token from current session
    const token = session?.data?.accessToken;
    // token validity check with backend
    const apiResponse = await fetch(apiEndpoints.users.fetchCurrentUser(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    // return success : true, if user still logged in
    return {
      success: apiResponse.ok
    };
  };

  return { verifyToken };
};
