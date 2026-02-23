/**
 * HomePage: trang chủ — gồm SearchBar (tìm theo vị trí/ngày/khách), Carousel banner, ExploreLocation (danh sách vị trí), AnyWhere (ở bất cứ đâu).
 */
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
