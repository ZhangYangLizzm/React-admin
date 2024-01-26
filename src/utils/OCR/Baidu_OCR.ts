import { OCR_KEY, OCR_TOKEN_KEY } from "@/constants/storageKey";
import store from "store";
class BaiDu_OCR {
  API_KEY: string;
  SECRET_KEY: string;

  words_result: string = "";
  words_result_num = 0;

  constructor(AK: string, SK: string) {
    this.API_KEY = AK;
    this.SECRET_KEY = SK;
  }

  Accesstoken_URL() {
    return `/baiduApi/oauth/2.0/token?grant_type=client_credentials&client_id=${this.API_KEY}&client_secret=${this.SECRET_KEY}`;
  }

  async OCR_URL() {
    const token = store.get(OCR_TOKEN_KEY);
    if (token) {
      return `/baiduApi/rest/2.0/ocr/v1/general_basic?access_token=${JSON.parse(token)}`;
    }
    return `/baiduApi/rest/2.0/ocr/v1/general_basic?access_token=${await this.getAccessToken()}`;
  }

  async getAccessToken() {
    const response = await fetch(this.Accesstoken_URL(), {
      method: "POST",
    });

    const data = await response.json();
    store.set(OCR_TOKEN_KEY, data.access_token);
    return data.access_token;
  }

  async Baidu_OCR_Main(base64Img: string) {
    const formData = new FormData();
    formData.append("image", base64Img);
    const OCR_URL = await this.OCR_URL();
    const response = await fetch(OCR_URL, {
      method: "POST",
      body: formData,
    });

    const OCR_result = await response.json();

    this.words_result_num = OCR_result.words_result_num;
    OCR_result.words_result.map(({ words }: { words: string }) => {
      this.words_result += words;
    });
  }
}

const Baidu_OCR = new BaiDu_OCR(OCR_KEY.API_KEY, OCR_KEY.SECRET_KEY);
export default Baidu_OCR;
