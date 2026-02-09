import { useMemo } from "react";
import { FaArrowRight, FaHeart, FaRegStar } from "react-icons/fa6";

const images = Array.from(
    { length: 5 },
    (_, i) => `https://picsum.photos/seed/experience-${i}/400/300`,
);

const images2 = Array.from(
    { length: 10 },
    (_, i) => `https://picsum.photos/seed/service-${i}/200/200`,
);

const services = [
    { id: 1, title: "Chụp ảnh" },
    { id: 2, title: "Đầu bếp" },
    { id: 3, title: "Massage" },
    { id: 4, title: "Đồ ăn chuẩn bị sẵn" },
    { id: 5, title: "Đào tạo" },
    { id: 6, title: "Trang điểm" },
    { id: 7, title: "Làm tóc" },
];

const sections = [
    { id: 1, title: "Chụp ảnh" },
    { id: 2, title: "Đầu bếp" },
    { id: 3, title: "Massage" },
];

const ServicePage = () => {
    const serviceCount = useMemo(() => Math.floor(Math.random() * 50) + 1, []);
    return (
        <div className="container my-6">
            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">
                    Dịch vụ tại South East Asia
                </h2>

                <div className="flex gap-4 overflow-x-auto ">
                    {services.map((service, i) => (
                        <div key={service.id} className="min-w-30 shrink-0">
                            <div className="aspect-square rounded-xl overflow-hidden mb-2">
                                <img
                                    src={images2[i]}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <p className="text-sm font-medium">
                                {service.title}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                Có {serviceCount} dịch vụ
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <section className="space-y-8">
                {sections.map((section) => (
                    <div key={section.id}>
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
                            {section.title}
                            <FaArrowRight className="text-sm" />
                        </h2>

                        <div className="flex gap-6 overflow-x-auto">
                            {images.map((image, i) => (
                                <div key={i} className="min-w-65">
                                    <div className="relative aspect-4/3 overflow-hidden rounded-xl mb-2">
                                        <img
                                            src={image}
                                            className="w-full h-full object-cover"
                                        />

                                        <span className="absolute top-2 left-2 bg-white text-xs font-medium px-2 py-1 rounded-full">
                                            Original
                                        </span>

                                        <div className="absolute top-2 right-2 text-red-400">
                                            <FaHeart />
                                        </div>
                                    </div>

                                    <h3 className="text-sm font-medium line-clamp-2">
                                        Trải nghiệm thiền định & yoga
                                    </h3>

                                    <p className="text-xs text-muted-foreground">
                                        Chiang Mai, Thailand
                                    </p>

                                    <p className="flex gap-2 text-xs mt-1">
                                        <span className="font-medium">
                                            Từ $40 / Khách
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FaRegStar />
                                            4.9
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ServicePage;
