"use client";
import { useState } from "react";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [rememberMe,setRememberMe] = useState(false);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const data = {
      email,
      password,
      rememberMe
    }


    console.log("the data is: ",data);

    setPassword("");
    setEmail("");
    setRememberMe(false);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SECTION */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white lg:flex lg:flex-col lg:justify-center px-12 xl:px-20">

          {/* Branding */}
          <div className="absolute left-12 top-12 flex items-center gap-3 xl:left-20">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <img width={"100%"} height={"100%"} className="rounded-xl" src="/univ-geeks-log.jpeg" alt="univGeeksLogo" />


            </div>

            <span className="text-2xl font-bold tracking-tight">
              UnivGeeks
            </span>
          </div>

          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
              Manage. Monitor. Grow.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-8 text-slate-500">
              Secure access to your admin dashboard.
              <br />
              Take control of your platform with ease.
            </p>

            {/* Dashboard Illustration */}
            <div className="relative mt-12 flex items-center justify-center">
              <div className="absolute h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />

              <div className="relative w-full max-w-lg">
                {/* Laptop */}
                <div className="rounded-2xl border-8 border-blue-200 bg-white p-3 shadow-xl">
                  <div className="flex h-64 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">

                    {/* Sidebar */}
                    <div className="w-24 bg-slate-700 p-3">
                      <div className="mb-6 h-2 w-10 rounded bg-blue-400" />

                      {[1, 2, 3, 4, 5].map((item) => (
                        <div
                          key={item}
                          className="mb-4 flex items-center gap-2"
                        >
                          <div className="h-2 w-2 rounded-full bg-slate-400" />
                          <div className="h-1.5 w-10 rounded bg-slate-500" />
                        </div>
                      ))}
                    </div>

                    {/* Dashboard */}
                    <div className="flex-1 p-5">
                      <div className="mb-5 flex gap-3">
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="h-9 flex-1 rounded-lg bg-blue-50"
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-slate-100 bg-white p-4">
                          <div className="mb-5 h-2 w-16 rounded bg-slate-200" />
                          <div className="flex h-24 items-end gap-2">
                            {[35, 55, 42, 70, 60, 85, 75].map(
                              (height, index) => (
                                <div
                                  key={index}
                                  className="flex-1 rounded-t bg-blue-300"
                                  style={{ height: `${height}%` }}
                                />
                              )
                            )}
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-white p-4">
                          <div className="mb-5 h-2 w-16 rounded bg-slate-200" />

                          <div className="space-y-3">
                            {[1, 2, 3, 4].map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-2"
                              >
                                <div className="h-3 w-3 rounded-full bg-blue-300" />
                                <div className="h-2 flex-1 rounded bg-slate-100" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="h-2 w-3/4 rounded bg-slate-100" />
                        <div className="h-2 w-1/2 rounded bg-slate-100" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop base */}
                <div className="mx-auto h-3 w-[90%] rounded-b-full bg-blue-200" />
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SECTION */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-lg">

            {/* Mobile logo */}
            <div className="mb-12 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z"
                  />
                </svg>
              </div>

              <span className="text-xl font-bold">AdminPanel</span>
            </div>

            {/* Heading */}
            <div className="mb-9">
              <h2 className="text-4xl font-bold tracking-tight">
                Welcome Back
              </h2>

              <p className="mt-3 text-base text-slate-500">
                Please sign in to access the admin panel.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit} >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Email Address
                </label>

                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Password
                </label>

                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <rect
                      width="14"
                      height="11"
                      x="5"
                      y="10"
                      rx="2"
                    />
                    <path
                      strokeLinecap="round"
                      d="M8 10V7a4 4 0 018 0v3"
                    />
                  </svg>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    
                    placeholder="Enter your password"
                    className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4 9.5 7a11.5 11.5 0 01-3.2 4.8M6.2 6.2A11.5 11.5 0 002.5 12c1 3 4.5 7 9.5 7 1.1 0 2.1-.2 3-.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.5 12S6 5 12 5s9.5 7 9.5 7S18 19 12 19 2.5 12 2.5 12z"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-500">
                  <input
                  checked={rememberMe}
                  onChange={()=>setRememberMe(!rememberMe)}
                    type="checkbox"
                    className="h-5 w-5 rounded border-slate-300 text-blue-500 focus:ring-blue-400"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-blue-500 transition hover:text-blue-600"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login */}
              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-blue-500 text-base font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-600 hover:shadow-xl active:scale-[0.99]"
              >
                Login

                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </button>
            </form>


          </div>
        </section>
      </div>
    </main>
  );
}


export default page
