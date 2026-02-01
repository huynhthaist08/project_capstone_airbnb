import { bannerCarousel } from "@/api/bannerCarousel";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/core/ui/carousel";

const CarouselBanner = () => {
    return (
        <div>
            <Carousel>
                <CarouselContent>
                    {bannerCarousel.map((item) => (
                        <CarouselItem key={item.id}>
                            <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-4">
                                {/* Left */}
                                <div className="h-[360px] overflow-hidden rounded-xl">
                                    <img
                                        src={item.left.image}
                                        alt={item.left.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Right */}
                                <div className="h-[360px] overflow-hidden rounded-xl">
                                    <img
                                        src={item.right.image}
                                        alt={item.right.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>
        </div>
    );
};

export default CarouselBanner;
