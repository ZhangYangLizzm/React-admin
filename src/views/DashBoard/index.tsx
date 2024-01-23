import React, { useState } from "react";
import NewVisits from "@/assets/newVisits.png";
import Messages from "@/assets/messages.png";
import Purchases from "@/assets/purchases.png";
import Shoppings from "@/assets/shoppings.png";
import HomeCharts from "./HomeCharts/HomeCharts";

interface RowCardItemProps {
  srcPath: string;
  title: string;
  description: string;
  onClick: (key: string) => void;
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
    <div
      onClick={() => onClick(title)}
      className={`${className} flex gap-4 items-center p-4 rounded-lg cursor-pointer hover:shadow-xl transition-all`}
    >
      <img
        src={srcPath}
        className="w-16"
      />
      <div className="">
        <h3>{title}</h3>
        <p className="">{description}</p>
      </div>
    </div>
  );
};

const RowCardItems = [
  { srcPath: NewVisits, title: "New Visits", description: "102400" },
  { srcPath: Messages, title: "Messages", description: "81212" },
  { srcPath: Purchases, title: "Purchases", description: "9280" },
  { srcPath: Shoppings, title: "Shoppings", description: "13600" },
];

const Home: React.FC = () => {
  const defaultLineChartKey = "New Visits";
  const [lineChartKey, setLineChartKey] = useState(defaultLineChartKey);
  const [currentIndex, setCurrentIndex] = useState(0);
  const rowCardItemClickHandler = (key: string, index: number) => {
    setLineChartKey(key);
    setCurrentIndex(index);
  };
  return (
    <div className="flex flex-col justify-around h-full">
      <div className="flex  gap-4 justify-around items-center p-4">
        {RowCardItems.map(({ srcPath, title, description }, index) => (
          <RowCardItem
            srcPath={srcPath}
            title={title}
            description={description}
            onClick={(key: string) => rowCardItemClickHandler(key, index)}
            key={title}
            className={`${index === currentIndex ? "shadow-xl" : "shadow"}`}
          />
        ))}
      </div>
      <HomeCharts currentLineChartKey={lineChartKey} />
    </div>
  );
};

export default Home;
