import {
  WechatOutlined,
  DingdingOutlined,
  AlipayCircleOutlined,
} from "@ant-design/icons";

const Channels = [
  {
    icon: <WechatOutlined className="text-green-600" />,
    desc: "Wechat",
  },
  {
    icon: <DingdingOutlined className="text-primary" />,
    desc: "Dingding",
  },
  {
    icon: <AlipayCircleOutlined className="text-primary" />,
    desc: "Alipay",
  },
];

export { Channels };
