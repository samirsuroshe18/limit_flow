import Table from "./Table";
import Login from "./Login";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_DOMAIN}/api/v1/limit-flow/get-current-user`,
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    axios
      .get(`${import.meta.env.VITE_DOMAIN}/api/v1/limit-flow/logout`, {
        withCredentials: true,
      })
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4 md:p-6">
      {isLoggedIn ? (
        <div className="w-full">
          <Table />
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
