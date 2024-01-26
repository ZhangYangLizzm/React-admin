export interface ExcelDataStruct {
  key: React.Key;
  id: number | string;
  title: string;
  author: string;
  readings: number;
  date: string;
}


export const Headers = ["id", "title", "author", "readings", "date"];

export const columns = Headers.map((item) => {
  return {
    header: item,
    key: item,
  };
});
