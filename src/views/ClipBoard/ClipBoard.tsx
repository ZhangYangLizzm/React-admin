import { Button, theme, message } from "antd";
import React, { useState } from "react";
import PASTE_HANDLERS from "./handlers";
import "./ClipBoard.less";
import Baidu_OCR from "@/utils/OCR/Baidu_OCR";
import { blobToBase64 } from "@/utils/FormatConverter";

const ClipBoard = () => {
  const [pasteData, setPasteData] = useState({
    type: "text/plain",
    data: "Waiting for the click of the button to paste the data...",
  });

  const [OCR_result, set_OCR_result] = useState(
    "Waiting for the click of the button to call the OCR...",
  );
  const clipBoardPaste = async () => {
    const items = await window.navigator.clipboard.read();
    const type = items[0].types[0];
    const pasteBlob = await items[0]?.getType(type);
    // 对象映射优化代码结构
    const pasteHandler = PASTE_HANDLERS[type];
    await pasteHandler(pasteBlob, setPasteData);
    return pasteBlob;
  };
  // 渲染剪贴板数据
  /* 
    'text/plain':普通的文本粘贴，
    'image/png':png格式的图片(应该也能支持其他格式)
   */
  const pasteDataRender = () => {
    const type = pasteData.type.split("/")[0];
    if (type === "text") {
      return <h1>{pasteData.data}</h1>;
    } else if (type === "image") {
      return <img src={pasteData.data} />;
    }
  };

  const pasteAndCallBaiDuOCR = async () => {
    const pasteBlob = await clipBoardPaste();
    if (pasteBlob.type === "image/png") {
      // TODO：优化，使用redux异步来判断message的loading和success
      message.loading({
        key: "loading",
        content: "正在图片识别中...",
        duration: 0,
      });
      const result = (await blobToBase64(pasteBlob)) as string;
      await Baidu_OCR.Baidu_OCR_Main(result);
      set_OCR_result(Baidu_OCR.words_result);

      message.destroy("loading");
      message.success("识别图片文字成功");
      // 图片的base64字符串
    } else {
      message.error("尚未粘贴图片");
    }
  };

  const Copy_OCR_result = () => {
    window.navigator.clipboard.writeText(OCR_result);
  };
  return (
    <>
      <div className="paste-only">
        <Button
          type="primary"
          onClick={clipBoardPaste}
          style={{ width: 100, marginRight: 16 }}
        >
          Paste
        </Button>
        <div className="paste-data">{pasteDataRender()}</div>
      </div>
      <div className="paste-ocr">
        <Button
          type="primary"
          onClick={pasteAndCallBaiDuOCR}
          style={{ width: "auto", marginRight: 16 }}
        >
          粘贴并调用图片识别OCR
        </Button>
        <Button
          type="primary"
          onClick={Copy_OCR_result}
          style={{ width: "auto" }}
        >
          复制识别内容
        </Button>

        <div className="paste-data">
          <h1>{OCR_result}</h1>
        </div>
      </div>
    </>
  );
};

export default ClipBoard;
