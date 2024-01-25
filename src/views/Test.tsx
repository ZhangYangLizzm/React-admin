const Test = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-16 h-16 rounded-tl-full   bg-primary"></div>
        <div className="w-16 h-16 rounded-tr-full   bg-primary"></div>
      </div>
      <div className="flex blur-lg">
        <div className="w-16 h-16 rounded-bl-full  bg-primary"></div>
        <div className="w-16 h-16 rounded-br-full   bg-primary"></div>
      </div>
    </div>
  );
};

export default Test;
