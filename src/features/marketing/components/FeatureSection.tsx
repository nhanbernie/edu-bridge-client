import React from "react";
import { MapPin, DollarSign, Award, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  linkText: string;
  iconBg: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  linkText,
  iconBg,
}) => {
  const getStrokeColor = () => {
    if (iconBg.includes("red")) return "#fca5a5";
    if (iconBg.includes("purple")) return "#c4b5fd";
    if (iconBg.includes("blue")) return "#93c5fd";
    return "#d1d5db";
  };

  const R = 24;
  const D = R * 2;

  return (
    <div
      className="relative shadow-lg bg-white p-8 hover:shadow-2xl transition-all duration-300 rounded-3xl border border-transparent hover:border-current overflow-hidden"
      style={{ borderColor: "transparent" }}
    >
      {/* Top-right corner arc (quarter-circle) */}
      <svg
        width={D}
        height={D}
        className="absolute top-0 right-0 pointer-events-none"
        viewBox={`0 0 ${D} ${D}`}
        fill="none"
      >
        {/* Arc chạy dọc theo bo góc trên-phải của rounded-3xl */}
        <path
          d={`M ${R} 0 A ${R} ${R} 0 0 1 ${D} ${R}`}
          stroke={getStrokeColor()}
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Bottom-left corner arc (quarter-circle) */}
      <svg
        width={D}
        height={D}
        className="absolute bottom-0 left-0 pointer-events-none"
        viewBox={`0 0 ${D} ${D}`}
        fill="none"
      >
        {/* Arc chạy dọc theo bo góc dưới-trái của rounded-3xl */}
        <path
          d={`M ${R} ${D} A ${R} ${R} 0 0 1 0 ${R}`}
          stroke={getStrokeColor()}
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Hover border overlay (nếu muốn đổi màu viền theo hover) */}
      <div
        className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-current opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ borderColor: getStrokeColor() }}
      />

      {/* Content */}
      <div className="relative space-y-6 text-left">
        <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
          <button className="flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
            {linkText}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: MapPin,
      title: "Giảng Viên Chất Lượng",
      description:
        "Đội ngũ giảng viên và gia sư được tuyển chọn kỹ lưỡng với trình độ chuyên môn cao và kinh nghiệm giảng dạy phong phú.",
      linkText: "Tìm hiểu thêm",
      iconBg: "bg-gradient-to-br from-red-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Giá Cả Hợp Lý",
      description:
        "Mức học phí cạnh tranh và minh bạch, phù hợp với nhiều đối tượng học viên từ cơ bản đến nâng cao.",
      linkText: "Xem bảng giá",
      iconBg: "bg-gradient-to-br from-purple-500 to-indigo-500",
    },
    {
      icon: DollarSign,
      title: "Học Tập Linh Hoạt",
      description:
        "Hỗ trợ học trực tuyến và offline, thời gian linh hoạt theo nhu cầu của học viên và giảng viên.",
      linkText: "Khám phá ngay",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Tại Sao Chọn Chúng Tôi</h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Nền tảng kết nối giảng viên và gia sư hàng đầu với nhiều ưu điểm vượt trội,
            <br />
            mang đến trải nghiệm học tập tốt nhất cho học viên
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mt-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              linkText={feature.linkText}
              iconBg={feature.iconBg}
            />
          ))}
        </div>

        {/* Experience Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-emerald-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">📸</span>
                </div>
                <p className="text-emerald-700 font-medium">Travel Experience Image</p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                Our Experience
                <br />
                Provide You Best Memory.
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Travel with many destinations of Lorem Ipsum available, but the majority have
                suffered alteration in some form, by injected humour, or randomised words.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">22</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">150K</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
