import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Consts/common";
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      navigate("/");
    }
  }, [navigate, setIsAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post('https://hackeruprojectapi.azurewebsites.net/login', {
        username,
        password,
      });
  
      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setIsAuthenticated(true);
        navigate('/');
        window.location.reload();
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid login credentials');
      } else {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : 'Something went wrong'
        );
      }
    }
  
    setLoading(false);
  };

  const infoForExaminer = (
    <div className="text-xs text-gray-500">
      Examiner credentials: <br />Admin user - admin/admin <br/>Normal user - user/user
    </div>
  );

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-neutral-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white px-8 pb-6 border border-gray-300 rounded-xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        {infoForExaminer}
        <div className="mt-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username:
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-400 sm:text-sm sm:leading-6"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password:
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-400 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md bg-zinc-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-zinc-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
