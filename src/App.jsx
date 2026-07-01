import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://dummyjson.com/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Invalid token");
        }

        setUser(data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <Profile user={user} setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  );
};

export default App;