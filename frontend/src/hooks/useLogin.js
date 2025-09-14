import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { ApiError } from "../../../backend/utils/apiError";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    const success = handleInputs({ username, password });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        throw new Error(data.message);
      }
      // local Storage
      localStorage.setItem("chat-user", JSON.stringify(data));
      // context
      setAuthUser(data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputs({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill all fields.");
    return false;
  }
  return true;
}
