import { MessageCircle, ChevronRight } from 'lucide-react';

const RecentDiscussions = () => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 mb-24 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-10 border-b border-gray-900 pb-4">
                    <h2 className="text-2xl font-light text-white tracking-wide">
                        Discussions
                    </h2>
                    <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors flex items-center gap-1">
                        View all <ChevronRight className="w-3 h-3" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {[
                        { topic: "Study tips for Organic Chemistry?", author: "Jessica Cole", replies: 24, time: "2h ago", tags: ["Chemistry"] },
                        { topic: "Best resources for System Design interview", author: "David Kim", replies: 56, time: "5h ago", tags: ["CS"] },
                        { topic: "Analyzing Hamlet's soliloquy", author: "Emily Brontë Fan", replies: 12, time: "1d ago", tags: ["Literature"] },
                        { topic: "Linear Algebra vs Calculus for ML", author: "MathWizard", replies: 89, time: "3h ago", tags: ["Math"] }
                    ].map((discussion, i) => (
                        <div key={i} className="flex items-start gap-4 p-0 group cursor-pointer">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-2 h-2 rounded-full bg-gray-700 group-hover:bg-white transition-colors"></div>
                            </div>
                            <div className="flex-1 min-w-0 border-l border-gray-900 pl-6 pb-2 group-hover:border-gray-800 transition-colors">
                                <h3 className="text-lg font-light text-gray-200 group-hover:text-white transition-colors mb-2 leading-tight">
                                    {discussion.topic}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span>{discussion.author}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-800"></span>
                                    <span>{discussion.time}</span>
                                    <span className="ml-auto flex items-center gap-1 group-hover:text-gray-400">
                                        <MessageCircle className="w-3 h-3" /> {discussion.replies}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentDiscussions;
