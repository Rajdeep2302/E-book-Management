import { useNavigate } from "react-router-dom";
import { ArrowLeft, Book, FileText, Award, Edit2, LogOut } from "lucide-react";

const ProfilePage = () => {
    const navigate = useNavigate();

    // Mock User Data
    const user = {
        name: "Rudra Patra",
        email: "rudra@gmail.com",
        role: "Student",
        joinDate: "January 2026",
        booksUploaded: 12,
        notesUploaded: 45,
        likesReceived: 125, // New field for calculation
    };

    // Dynamic Reputation Calculation
    const reputationScore = 
        (user.booksUploaded * 50) + 
        (user.notesUploaded * 20) + 
        (user.likesReceived * 10);

    return (
        <div className="min-h-screen bg-black text-white px-4 py-20 animate-in fade-in duration-700">

            {/* Background Ambience */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header / Navigation */}
                <div className="mb-12 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-widest text-xs font-bold">Back to Home</span>
                    </button>

                    <button className="flex items-center gap-2 text-red-500 hover:text-red-400 uppercase tracking-widest text-xs font-bold transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>

                {/* Profile Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Box: Identity */}
                    <div className="md:col-span-1">
                        <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-blue-500/20 to-purple-500/20">
                            <div className="bg-[#0a0a0a] rounded-3xl p-8 flex flex-col items-center text-center h-full">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-1 mb-6">
                                    <img
                                        src="https://ui-avatars.com/api/?name=Rudra+Patra&background=0a0a0a&color=fff"
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover border-4 border-black"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                                <p className="text-gray-400 text-sm mb-4">{user.email}</p>
                                <span className="px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                                    {user.role}
                                </span>

                                <div className="mt-8 w-full">
                                    <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                                        <Edit2 className="w-4 h-4" /> Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Box: Stats & Content */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl group hover:border-white/10 transition-colors">
                                <div className="mb-4 bg-white/5 w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Book className="w-5 h-5 text-blue-400" />
                                </div>
                                <h3 className="text-3xl font-bold mb-1 font-mono">{user.booksUploaded}</h3>
                                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Books Uploaded</p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl group hover:border-white/10 transition-colors">
                                <div className="mb-4 bg-white/5 w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <FileText className="w-5 h-5 text-purple-400" />
                                </div>
                                <h3 className="text-3xl font-bold mb-1 font-mono">{user.notesUploaded}</h3>
                                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Notes Shared</p>
                            </div>

                            <div className="relative bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl group hover:border-white/10 transition-colors overflow-hidden">
                                <div className="mb-4 bg-white/5 w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Award className="w-5 h-5 text-yellow-400" />
                                </div>
                                <h3 className="text-3xl font-bold mb-1 font-mono text-yellow-500">{reputationScore}</h3>
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Reputation</p>
                                    
                                    {/* Info Tooltip */}
                                    <div className="relative group/info">
                                        <div className="w-4 h-4 rounded-full border border-gray-600 text-gray-400 flex items-center justify-center text-[10px] cursor-help">
                                            i
                                        </div>
                                        {/* Tooltip Content */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 border border-gray-800 rounded-xl text-[10px] text-gray-400 shadow-xl opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all duration-300 z-20 pointer-events-none">
                                            <div className="space-y-1">
                                                <div className="flex justify-between"><span>Book Upload</span> <span className="text-white">+50</span></div>
                                                <div className="flex justify-between"><span>Note Share</span> <span className="text-white">+20</span></div>
                                                <div className="flex justify-between"><span>Like Received</span> <span className="text-white">+10</span></div>
                                            </div>
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-b border-r border-gray-800 rotate-45" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity / Content Section */}
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 min-h-[300px]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold">Recent Uploads</h3>
                                <a href="#" className="text-sm text-blue-500 hover:text-blue-400">View all</a>
                            </div>

                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm group-hover:text-blue-400 transition-colors">Digital Logic Design - Module {item}</h4>
                                                <p className="text-xs text-gray-500">Uploaded 2 days ago • PDF</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-gray-400 bg-black/50 px-3 py-1 rounded-full">1.2mb</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
