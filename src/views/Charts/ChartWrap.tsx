import { useHeight } from "@/hooks/useHeight";
import { Spin } from "antd";

const ChartWrap = ({ chart }: { chart: Function }) => {
  const { divRef, divHeight, loading } = useHeight();

  return (
    <div
      className="h-full flex items-center justify-center w-full p-4"
      ref={divRef}
    >
      {loading ? (
        <Spin
          spinning={loading}
          size="large"
        />
      ) : (
        chart(divHeight)
      )}
    </div>
  );
};

export default ChartWrap;
