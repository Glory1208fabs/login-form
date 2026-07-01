import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    ),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const LoginForm = ({ setUser }) => {
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setApiError("");

    try {
      const loginResponse = await fetch(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Login failed");
      }

      localStorage.setItem("accessToken", loginData.accessToken);

      const profileResponse = await fetch(
        "https://dummyjson.com/auth/me",
        {
          headers: {
            Authorization: `Bearer ${loginData.accessToken}`,
          },
        }
      );

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error("Unable to fetch user");
      }

      setUser(profileData);
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Welcome Back !</h1>
        <p>Sign in to continue</p>

        <div className="input-group">
          <label htmlFor="username">Username</label>

          <input
            id="username"
            placeholder="Enter username"
            {...register("username")}
          />

          {errors.username && (
            <p  className="error-message">{errors.username.message}</p>
          )}
          
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />

          {errors.password && (
            <p  className="error-message">{errors.password.message}</p>
          )}
        </div>

        {apiError && <p className="error-message">{apiError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

      </form>
    </div>
  );
};

export default LoginForm;