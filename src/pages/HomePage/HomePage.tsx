import AnyWhere from "./AnyWhere";
import CarouselBanner from "./Carousel";
import ExploreLocation from "./ExploreLocation";
import SearchBar from "./SearchBar";

const HomePage = () => {
    return (
        <div>
            <SearchBar />
            <CarouselBanner />
            <ExploreLocation />
            <AnyWhere />
        </div>
    );
};

export default HomePage;
