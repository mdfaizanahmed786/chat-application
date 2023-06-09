import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const Signup = (props: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token") as string);
    if (user) {
      location.pathname = "/";
      window.location.replace("/");
    }
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !password || !name) {
        toast.error("Please check your inputs!", {
          style: {
            borderRadius: "6px",
            background: "#333",
            color: "#fff",
          },
        });
        return;
      }
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/auth/register`,
        {
          email,
          password,
          name,
        }
      );

      if (data?.success) {
        setLoading(false);
        toast.success("Signup successful!", {
          style: {
            borderRadius: "6px",
            background: "#333",
            color: "#fff",
          },
        });
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: data?.token,
            user: data?._id,
            name: data?.name,
          })
        );
        window.location.replace("/");
      }
    } catch (err: any) {
      setLoading(false);
      toast.error("Something unexpected happen! Please check your inputs!", {
        style: {
          borderRadius: "6px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  return (
    <div className="bg-gradient-to-r h-screen flex flex-col justify-center items-center from-[#2A303C] to-[#0B090C]">
      <div className="w-full">
        <div className="flex flex-col  items-center justify-center px-6  mx-auto  lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-xl ring-1 ring-white/40 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#120F13] dark:border-[#120F13] ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center py-2 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign Up to get started!
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already a register user?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-14">
        <p>Developed by Mohammed Faizan Ahmed</p>
        <div className="flex gap-4 w-full justify-center">
          <a
            href="https://www.linkedin.com/in/faizan-ahmed-4ab0a522a/"
            className="bg-transparent"
          >
            <img src="/linkedin.svg" className="h-9 w-9" alt="linkedin" />
          </a>
          <a
            href="https://github.com/mdfaizanahmed786"
            className="bg-transparent"
          >
            <img src="/github.svg" className="h-9 w-9" alt="github" />
          </a>
          <a
            href="https://www.instagram.com/ahmed_faizan_7860/"
            className="bg-transparent"
          >
            <img src="/instagram.svg" className="h-9 w-9" alt="instagram" />
          </a>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Signup;
