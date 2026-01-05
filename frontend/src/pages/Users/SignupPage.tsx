import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Role = "student" | "teacher";

const SignupPage = () => {
  const [role, setRole] = useState<Role>("student");
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex bg-black text-white selection:bg-blue-500/30 selection:text-blue-200">

      {/* LEFT IMAGE SECTION */}
      <div className="relative w-1/2 h-full hidden md:flex overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://i.pinimg.com/736x/b6/45/7a/b6457a4f6c939f2f624a5ea4afbfe4c9.jpg"
          alt="education"
          className="w-full h-full object-cover transition-transform duration-1000 md:hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-20" />

        {/* GLOW EFFECT ON BORDER */}
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-blue-600/30 to-transparent blur-3xl z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent z-40" />

        {/* Floating Quote */}
        <div className="absolute bottom-12 left-12 max-w-lg z-30">
          <div className="w-12 h-1 bg-blue-500 mb-6" />
          <p className="text-3xl font-light italic text-gray-200 leading-relaxed">
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          </p>
          <p className="mt-4 text-gray-400 font-mono text-sm uppercase tracking-widest">— Malcolm X</p>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full md:w-1/2 h-full flex flex-col px-6 sm:px-12 lg:px-20 py-12 relative overflow-y-auto">

        {/* Background Ambience */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* HEADER */}
        <div className="flex items-center justify-between mb-16 relative z-10">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-bold text-lg tracking-[0.2em] text-white/90 uppercase">
              EDU<span className="text-blue-500">HUB</span>
            </span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>

        {/* MAIN FORM CONTENT */}
        <div className="max-w-md w-full my-auto mx-auto relative z-10">
          <div className="mb-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tighter">
              Start your <br />
              <span className="text-blue-500">journey.</span>
            </h2>
            <p className="text-gray-400 text-lg font-light">
              Join the community of modern scholars.
            </p>
          </div>

          {/* ROLE SELECTOR - Custom Pill */}
          <div className="relative p-1 bg-[#050505] rounded-full border border-white/10 mb-8 flex">
            <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${role === "student" ? "text-white bg-gray-800" : "text-gray-500 hover:text-gray-300"
                }`}
            >
              <span className="relative z-10">Student</span>
              {role === "student" && (
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
              )}
            </button>
            <button
              onClick={() => setRole("teacher")}
              className={`flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${role === "teacher" ? "text-white bg-gray-800" : "text-gray-500 hover:text-gray-300"
                }`}
            >
              <span className="relative z-10">Teacher</span>
              {role === "teacher" && (
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
              )}
            </button>
          </div>


          {/* INPUTS */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="group relative">
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 ml-4">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[#050505] text-white border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:bg-gray-900/50 transition-all placeholder:text-gray-700 font-light"
                />
              </div>
            </div>


            <div className="group relative">
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 ml-4">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder={role === "student" ? "student@email.com" : "teacher@email.com"}
                  className="w-full bg-[#050505] text-white border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:bg-gray-900/50 transition-all placeholder:text-gray-700 font-light"
                />
              </div>
            </div>

            {/* CONDITIONAL PHONE NUMBER FIELD */}

            <div className="group relative animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 ml-4">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="xxx-xxx-xxxx"
                  onKeyDown={(e) => {
                    const isNumber = /^[0-9]$/i.test(e.key);
                    const isControlKey = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key);
                    if (!isNumber && !isControlKey) e.preventDefault();
                  }}
                  className="w-full bg-[#050505] text-white border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:bg-gray-900/50 transition-all placeholder:text-gray-700 font-light"
                />
              </div>
            </div>
            {role === "student" && (
              <div className="group relative animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 ml-4">Department</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Department name"
                    className="w-full bg-[#050505] text-white border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:bg-gray-900/50 transition-all placeholder:text-gray-700 font-light"
                  />
                </div>
              </div>
            )}

            <div className="group relative">
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 ml-4">Institute Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Institute Name"
                  className="w-full bg-[#050505] text-white border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:bg-gray-900/50 transition-all placeholder:text-gray-700 font-light"
                />
              </div>
            </div>

            <div className="group relative">
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 ml-4">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#050505] text-white border border-gray-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:bg-gray-900/50 transition-all placeholder:text-gray-700 font-light"
                />
              </div>
            </div>

            {/* BUTTON WITH GEMINI BORDER */}
            <div className="relative group mt-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-2xl opacity-25 blur transition duration-500 group-hover:opacity-100 group-hover:duration-200" />
              <button className="relative w-full bg-black text-white py-4 rounded-xl font-semibold uppercase tracking-widest text-sm flex items-center justify-center gap-2 leading-none">
                Create Account <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* FOOTER */}
          <p className="text-gray-500 mt-8 text-center font-light">
            Already have an account?{" "}
            <button
              onClick={() => navigate('/login')}
              className="text-white font-medium hover:text-blue-400 transition-all underline underline-offset-4 decoration-blue-500/30"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;