import { PiPercentBold } from "react-icons/pi";

// Hàm làm sạch tỷ lệ phần trăm
const cleanPercentage = (percentage) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // kiểm tra giá trị không phải số
  return isNegativeOrNaN ? 0 : Math.min(100, +percentage); // Giới hạn từ 0 đến 100
};

// Tạo vòng tròn với tỷ lệ phần trăm
const Circle = ({ colour, percentage, r, strokew }) => {
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100; // phần bắt đầu của stroke
  return (
    <circle
      r={r}
      cx={50} // Điều chỉnh lại vị trí căn giữa
      cy={50} // Điều chỉnh lại vị trí căn giữa
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // loại bỏ màu khi 0%
      strokeWidth={strokew}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinejoin="round" // Làm mượt góc nối của đường viền
      strokeLinecap="round" // Làm mượt các đầu đường viền
    ></circle>
  );
};

// Hiển thị tỷ lệ phần trăm lên trung tâm vòng tròn
const Text = ({ percentage }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5rem"}
      fill="white"
    >
      {percentage.toFixed(0)}
      %
    </text>
  );
};

// Component Pie để vẽ vòng tròn tiến trình
const Pie = ({ percentage, colour, r, strokew }) => {
  const pct = percentage > 100 ? 100 : cleanPercentage(percentage);

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      {" "}
      {/* Cập nhật viewBox */}
      <g transform={`rotate(-90 ${"50 50"})`}>
        {" "}
        {/* Căn giữa lại vòng tròn */}
        <Circle
          colour="lightgray"
          isBackground={true}
          r={r}
          strokew={strokew}
        />
        <Circle colour={colour} percentage={pct} r={r} strokew={strokew} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

// Rating Component sử dụng Pie và hiển thị đánh giá
export function Rating({ score, r = 25, strokew = "0.3rem" }) {
  const getColor = (score) => {
    if (score * 10 < 40) return "rgb(231, 76, 60)"; // red (bad)
    if (score * 10 < 70) return "rgb(241, 196, 15)"; // yellow (meh)
    return "rgb(39, 174, 96)"; // green (good)
  };

  const scorePercentage = score * 10; // Chuyển đổi điểm 1-10 thành tỷ lệ phần trăm 0-100

  return (
    <div className="flex items-center justify-center">
      <Pie
        r={r}
        strokew={strokew}
        percentage={scorePercentage}
        colour={getColor(score)}
      />
    </div>
  );
}
