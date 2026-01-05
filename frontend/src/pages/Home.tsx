import Hero from '../components/home/Hero';
import CategoryPills from '../components/home/CategoryPills';
import RecommendedBooks from '../components/home/RecommendedBooks';
import TrendingNotes from '../components/home/TrendingNotes';
import RecentDiscussions from '../components/home/RecentDiscussions';
import FooterCTA from '../components/home/FooterCTA';

const Home = () => {
    return (
        <div className="min-h-screen bg-black">
            <Hero />
            <CategoryPills />
            <RecommendedBooks />
            <TrendingNotes />
            <RecentDiscussions />
            <FooterCTA />
        </div>
    );
};

export default Home;
