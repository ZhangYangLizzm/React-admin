import { Status, StatusSetter } from "./status";

interface TipProps extends StatusSetter {
  title: string;
  desc: string;
  buttonText: string;
}

const Tip = ({ setStatus, title, desc, buttonText }: TipProps) => {
  return (
    <div className="text-center flex flex-col gap-4">
      <div>
        <h2 className="text-white">{title}</h2>
        <p className="text-white text-opacity-80">{desc}</p>
      </div>
      <div className="flex justify-center">
        <div
          className="text-white border border-solid border-white py-2 px-8 font-bold cursor-pointer"
          onClick={() => setStatus?.(Status.SignUp)}
        >
          {buttonText}
        </div>
      </div>
    </div>
  );
};

export default Tip;
