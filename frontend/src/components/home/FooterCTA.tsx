import { useNavigate } from 'react-router-dom';

const FooterCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="px-4 sm:px-6 lg:px-8 border-t border-gray-900/50 bg-black">
            <div className="max-w-7xl mx-auto py-24 text-center">
                <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">Contribute to the Archive</h2>
                <p className="text-gray-500 mb-10 max-w-xl mx-auto font-light leading-relaxed">
                    Join a global community of scholars. Share your notes and help others learn.
                </p>
                <button
                    onClick={() => navigate('/upload')}
                    className="bg-white text-black px-10 py-4 rounded-full font-medium text-sm hover:bg-gray-200 transition-colors tracking-wide"
                >
                    Upload Resources
                </button>
            </div>
        </section>
    );
};

export default FooterCTA;
