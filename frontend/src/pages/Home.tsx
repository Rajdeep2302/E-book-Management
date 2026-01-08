import Hero from '../components/home/Hero'
import RecommendedBooks from '../components/home/RecommendedBooks';
import TrendingNotes from '../components/home/TrendingNotes';
import RecentDiscussions from '../components/home/RecentDiscussions';
import DepartmentScroller from '../components/home/DepartmentScroller';
import FooterCTA from '../components/home/FooterCTA';

const Home = () => {
    return (
        <div className="min-h-screen bg-[#030303] relative overflow-hidden">


            <div className="relative z-10">
                <Hero />
                <DepartmentScroller />
                <RecommendedBooks />
                <TrendingNotes />
                <RecentDiscussions />
                <FooterCTA />
            </div>
        </div>
    );
};

export default Home;
