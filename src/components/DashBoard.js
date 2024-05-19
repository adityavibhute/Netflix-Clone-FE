import Header from "./Header";
import List from "./List";
import Banner from "./Banner";

const Dashboard = () => {
    return (
        <>
            <Header />
            <Banner />
            <List title="Netflix Originals" param="originals" />
            <List title="Trending Now" param="trending" />
            <List title="Now Playing" param="now_playing" />
            <List title="popular" param="popular" />
            <List title="Top Rated" param="top_rated" />
            <List title="Upcoming" param="upcoming" />
        </>
    )
};

export default Dashboard;