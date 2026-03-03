import { login } from "../lib/authservice";
import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email.trim() || !password.trim()) {
    setError("Please enter both email and password.");
    return;
  }
  setLoading(true);
  setError("");

  try {
    await login(email, password);
    onLogin();
  } catch (err) {
    setError(err || "Invalid credentials. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="h-screen flex font-sans bg-[#1a1612] overflow-hidden">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-16 py-18 bg-gradient-to-br from-[#1e1a14] via-[#2a2318] to-[#1a1612] relative overflow-hidden">
        {/* Background glow circles */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(197,163,85,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(197,163,85,0.08),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 animate-fade-up -mt-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[rgba(197,163,85,0.1)] border border-[rgba(197,163,85,0.25)] rounded-full px-4 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a355] animate-pulse" />
            <span className="text-[#c5a355] text-[11px] tracking-[2px] uppercase font-medium">
              Admin Portal
            </span>
          </div>

          {/* Title */}
        <h1 className="font-serif text-6xl font-light text-[#f0e8d5] leading-tight mb-3">
  Apostle
  <br />
  <span
    className="italic text-[#c5a355] animate-fade-loop"
    style={{ animationDelay: "1.2s" }}
  >
    Osaren
  </span>
</h1>

<p
  className="text-[rgba(240,232,213,0.45)] text-xs tracking-[3px] uppercase font-light mb-12 animate-fade-loop"
  style={{ animationDelay: "2.4s" }}
>
  Evangelist · Author · Teacher
</p>

          {/* Divider */}
          <div className="w-12 h-px bg-gradient-to-r from-[#c5a355] to-transparent mb-8" />

          {/* Quote */}
          <p className="font-serif text-lg font-light text-[rgba(240,232,213,0.6)] leading-relaxed max-w-sm italic">
            "Bringing the Word of God to all nations through books, teachings,
            and journals."
          </p>

          {/* Stats */}
          <div className="flex gap-10 mt-14">
            {[
              { value: "2,430", label: "Subscribers" },
              { value: "10", label: "Books" },
              { value: "3", label: "Journals" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-3xl font-medium text-[#c5a355] leading-none mb-1">
                  {s.value}
                </div>
                <div className="text-[10px] text-[rgba(240,232,213,0.35)] tracking-[1.5px] uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="w-full lg:w-[580px] lg:min-w-[580px] bg-[#f5f0e8] flex flex-col justify-center px-10 lg:px-14 py-16 relative">
        {/* Gold left border */}
        <div className="hidden lg:block absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#c5a355] to-transparent" />

        <div className="w-full max-w-sm mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div>
              {/* logo img*/}
              <img src="/LTlogo1.png" alt="" className="h-[4rem] w-[8rem]" />
              <p className="text-[12px] text-[#9a8c7a] tracking-[1.5px] uppercase mt-0.5">
                Admin Panel access
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className=" px-5 py-4 bg-gradient-to-r from-[#1a1612] to-[#8a6f3a] text-white rounded-xl mb-10">
            <h2 className="flex items-center justify-center text-xl font-semibold">
              Administrator Login
            </h2>
            <p className=" flex items-center justify-center text-gray-300 text-sm">
              Secure access to management panel
            </p>
          </div>

          {/* <h2 className="font-serif text-4xl font-normal text-[#1a1612] mb-1">
                    Administrator <span className="italic text-[#8a6f3a]">Login</span>
                </h2>
                <p className="text-md text-[#9a8c7a] font-light mb-10">
                    Secure access to management panel
                </p> */}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5 text-sm text-red-600">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="flex items-center gap-2 text-[12px] font-semibold tracking-[1.5px] uppercase text-[#584127] mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
                Email
              </label>
              <input
                type="email"
                placeholder="✉️ Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={`w-full px-4 py-3.5 bg-white rounded-lg text-sm text-[#1a1612] placeholder-[#c0b8ae] outline-none transition-all duration-200
                  ${
                    error
                      ? "border-2 border-red-400 ring-2 ring-red-100"
                      : "border-2 border-[#e0d8cc] focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)]"
                  }`}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="flex items-center gap-2 text-[12px] font-semibold tracking-[1.5px] uppercase text-[#584127] mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                placeholder="🔑 Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className={`w-full px-4 py-3.5 pr-12 bg-white rounded-lg text-sm text-[#1a1612] placeholder-[#c0b8ae] outline-none transition-all duration-200
                  ${
                    error
                      ? "border-2 border-red-400 ring-2 ring-red-100"
                      : "border-2 border-[#e0d8cc] focus:border-[#c5a355] focus:ring-2 focus:ring-[rgba(197,163,85,0.15)]"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
                className="absolute right-3.5 bottom-3.5 text-[#9a8c7a] hover:text-[#6b5e4e] transition-colors"
              >
                {showPass ? (
                  <svg
                    width="18"
                    height="18"
                    hover:color="#c5a355"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    hover:color="#c5a355"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-2 border-[#e0d8cc] accent-[#c5a355] cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-sm text-[#6b5e4e] cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 bg-gradient-to-br from-[#2a2318] to-[#1a1612] text-[#f8f7f5] rounded-lg text-[13px] hover:text-[#c5a355] font-semibold tracking-[2px] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a355] animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a355] animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a355] animate-bounce [animation-delay:300ms]" />
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Sign In
                </span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div class="text-center mt-5">
            <a
              href="https://it-portfolio-rose.vercel.app/"
              class="inline-flex items-center text-sm text-gray-600 hover:text-[#C2933E]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              Return to main website
            </a>
          </div>
          <div className="flex items-center justify-center gap-2  pt-3 border-t border-[#e0d8cc] text-xs text-[#8b806c]">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            Secured · Apostle Osaren Admin Portal
          </div>
        </div>
      </div>
    </div>
  );
}
