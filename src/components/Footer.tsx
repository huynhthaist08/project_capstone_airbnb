import googleplay from "../assets/images/google-play.png";
import appstore from "../assets/images/app-store.png";
import { gioiThieu, congDong, donTiepKhach, hoTro } from "@/api/footer";

const Footer = () => {
    const clickToAirBnb = () => {
        window.location.href = "https://www.airbnb.com.vn/";
    };

    return (
        <>
            <footer className="bg-(--color-bg-footer) shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
                <div className="container mx-auto px-6 py-10">
                    <div className="mt-5 grid grid-cols-4 gap-x-24 border-b pb-5">
                        <div className="space-y-3">
                            <h4 className="mb-4 font-semibold uppercase">
                                Giới thiệu
                            </h4>
                            {gioiThieu.map((item) => (
                                <ul key={item.id} className="text-sm">
                                    <li
                                        className="hover:text-[#6c6c6c] cursor-pointer"
                                        onClick={clickToAirBnb}
                                    >
                                        {item.title}
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <h4 className="mb-4 font-semibold uppercase">
                                Cộng đồng
                            </h4>
                            {congDong.map((item) => (
                                <ul key={item.id} className="text-sm">
                                    <li
                                        className="hover:text-[#6c6c6c] cursor-pointer"
                                        onClick={clickToAirBnb}
                                    >
                                        {item.title}
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <h4 className="mb-4 font-semibold uppercase">
                                Đón tiếp khách
                            </h4>
                            {donTiepKhach.map((item) => (
                                <ul key={item.id} className="text-sm">
                                    <li
                                        className="hover:text-[#6c6c6c] cursor-pointer"
                                        onClick={clickToAirBnb}
                                    >
                                        {item.title}
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <h4 className="mb-4 font-semibold uppercase">
                                Hỗ trợ
                            </h4>
                            {hoTro.map((item) => (
                                <ul key={item.id} className="text-sm">
                                    <li
                                        className="hover:text-[#6c6c6c] cursor-pointer"
                                        onClick={clickToAirBnb}
                                    >
                                        {item.title}
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>

                    {/*Bottom grid */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="space-y-6">
                            <div className="flex gap-5">
                                <p>© 2026 Airbnb, Inc. All reserved</p>
                                <p className="hover:text-[#6c6c6c] cursor-pointer">
                                    · Quyền riêng tư
                                </p>
                                <p className="hover:text-[#6c6c6c] cursor-pointer">
                                    · Điều khoản
                                </p>
                                <p className="hover:text-[#6c6c6c] cursor-pointer">
                                    · Dịch vụ
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-3">
                                <div className="h-10 w-36 bg-black text-white flex items-center gap-2 px-3 rounded cursor-pointer">
                                    <img
                                        src={googleplay}
                                        alt="Google Play"
                                        className="h-5 w-5"
                                    />
                                    <span className="text-sm font-medium">
                                        Google Play
                                    </span>
                                </div>
                                <div className="h-10 w-36 bg-black text-white flex items-center gap-2 px-3 rounded cursor-pointer">
                                    <img
                                        src={appstore}
                                        alt="Google Play"
                                        className="h-5 w-5"
                                    />
                                    <span className="text-sm font-medium">
                                        App Store
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
