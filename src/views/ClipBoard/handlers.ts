const textHandler: handler = async (pasteBlob, setPasteData) => {
  const text = await new Response(pasteBlob).text();
  setPasteData(() => ({
    type: "text/plain",
    data: text,
  }));
};

const imageHandler: handler = async (pasteBlob, setPasteData) => {
  const image = await new Response(pasteBlob).blob();
  const imageURL = URL.createObjectURL(image);
  setPasteData(() => ({
    type: "image/png",
    data: imageURL,
  }));
};

const PASTE_HANDLERS: Handlers = {
  "text/plain": textHandler,
  "image/png": imageHandler,
};

export default PASTE_HANDLERS;
