import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg bg-cover bg-center flex items-center justify-center">
      <div className="p-6 backdrop-blur-sm border-2 rounded-xl border-sky-300 w-45 min-w-60 sm:w-90 sm:p-4 lg:w-100  lg:p-5 lg:items-end">
        <div className="flex flex-col min-h-70 items-center gap-3 sm:gap-1 sm:px-4 lg:px-5">
          <h1 className="text-white font-extrabold text-4xl font-funnel-sans mt-4 sm:mt-1 lg:mt-5">
            Login
          </h1>
          <form
            action="submit"
            className="flex flex-col mt-4 gap-5 w-50 sm:w-full"
          >
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="px-5 py-2 text-white outline-none border-1 rounded-3xl font-medium focus:ring-2 focus:ring-sky-600 border-sky-300"
            />
            <input
              type="password"
              className="px-5 py-2 text-white outline-none border-1 rounded-3xl font-medium focus:ring-2 focus:ring-sky-600 border-sky-300"
              name="password"
              id="password"
              placeholder="Password"
            />
            <div className="flex w-full justify-between gap-1">
              <div className="flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="form-checkbox"
                />
                <label
                  htmlFor="remember-me"
                  className="text-white text-2xs sm:text-sm font-medium"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-white text-2xs sm:text-sm font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <button className="text-sky-400 bg-white rounded-lg p-2 hover:cursor-pointer hover:scale-109 transition font-semibold ">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
