type setPasteDataType = React.Dispatch<
  React.SetStateAction<{
    type: string;
    data: string;
  }>
>;

type handler = (
  pasteBlob: Blob,
  setPasteData: setPasteDataType,
) => Promise<void>;

interface Handlers {
  [key: string]: (
    pasteBlob: Blob,
    setPasteData: setPasteDataType,
  ) => Promise<void>;
}
