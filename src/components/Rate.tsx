import { Rate as AvtdRate } from "antd";

const Rate = ({ rate }: { rate: number }) => {
  return (
    <AvtdRate
      disabled
      allowHalf
      defaultValue={rate / 2}
      style={{ color: "#fadb14" }}
    />
  );
};

export default Rate;
