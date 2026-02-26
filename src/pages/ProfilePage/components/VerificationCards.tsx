// ô xác thực ng dùng
import type { UserProfile } from "../servers/profile.type";

interface Props {
  profile: UserProfile;
}

export const VerificationCards = ({ profile }: Props) => {
  console.log('Profile:', profile); // Use profile to avoid warning
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Title */}
      <h3 className="text-xl font-bold mb-4 pb-4 border-b">
        Xác minh danh tính
      </h3>

      {/* Verification Item */}
      <div className="flex items-center gap-3 mb-4">
        <div className="shrink-0">
          <svg 
            className="w-6 h-6 text-gray-700" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <span className="text-gray-700 font-medium">Đã xác nhận email</span>
      </div>

      {/* Badge Button */}
      <button className="w-full mt-6 py-3 px-4 border-2 border-gray-800 rounded-lg text-gray-800 font-semibold hover:bg-gray-50 transition-colors">
        Nhận huy hiệu
      </button>

      {/* Info Text */}
      <div className="mt-6 pt-6 border-t">
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold">Du đã xác nhận</span>
        </p>
        <div className="flex items-center gap-2 mt-2">
          <svg 
            className="w-5 h-5 text-green-600" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="text-sm text-gray-700">Đã xác nhận email</span>
        </div>
      </div>
    </div>
  );
};
