import React, { useState } from "react";
import NewVisits from "@/assets/newVisits.png";
import Messages from "@/assets/messages.png";
import Purchases from "@/assets/purchases.png";
import Shoppings from "@/assets/shoppings.png";
import HomeCharts, { LineChartKey } from "./homeCharts/HomeCharts";

interface RowCardItemProps {
  srcPath: string;
  title: LineChartKey;
  description: number | string;
  onClick: (key: LineChartKey) => void;
  className: string;
}
const RowCardItem = ({
  srcPath,
  title,
  description,
  onClick,
  className,
}: RowCardItemProps) => {
  return (
    <div className="flex-grow p-4 bg-transparent">
      <div
        onClick={() => onClick(title)}
        className={`${className} flex gap-4 items-center p-4 rounded-lg cursor-pointer hover:shadow-lg transition-all`}
      >
        <img
          src={srcPath}
          className="w-16"
        />
        <div className="flex flex-col gap-4 flex-grow">
          <p className="leading-none font-bold">{title}</p>
          <p className="tracking-wider ">{description}</p>
        </div>
      </div>
    </div>
  );
};

const RowCardItems = [
  {
    srcPath: NewVisits,
    title: LineChartKey.NewVisits,
    description: "102400.123",
  },
  { srcPath: Messages, title: LineChartKey.Messages, description: "81212.123" },
  {
    srcPath: Purchases,
    title: LineChartKey.Purchases,
    description: "9280.123",
  },
  {
    srcPath: Shoppings,
    title: LineChartKey.Shoppings,
    description: "13600.213",
  },
];

const Dashboard: React.FC = () => {
  const defaultLineChartKey = LineChartKey.NewVisits;
  const [lineChartKey, setLineChartKey] =
    useState<LineChartKey>(defaultLineChartKey);
  const [currentIndex, setCurrentIndex] = useState(0);
  const rowCardItemClickHandler = (key: LineChartKey, index: number) => {
    setLineChartKey(key);
    setCurrentIndex(index);
  };
  return (
    <div className="flex flex-col h-full ">
      <div className="flex gap-4 justify-around items-center p-4">
        {RowCardItems.map(({ srcPath, title, description }, index) => (
          <RowCardItem
            srcPath={srcPath}
            title={title}
            description={description}
            onClick={(key: LineChartKey) => rowCardItemClickHandler(key, index)}
            key={title}
            className={`${index === currentIndex ? "shadow-lg" : "shadow"}`}
          />
        ))}
      </div>
      <div className="flex-grow flex items-center ">
        <HomeCharts currentLineChartKey={lineChartKey} />
      </div>
    </div>
  );
};

export default Dashboard;
