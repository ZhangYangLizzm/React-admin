import { Button } from "antd";
import { useState } from "react";
enum Status {
  Login,
  SignUp,
}
const Login = () => {
  const [status, setStatus] = useState(Status.Login);
  return (
    <div className="w-full bg-primary h-full flex justify-between">
      <div className="flex items-center justify-center bg-white basis-1/2">
        <div>
          <Button
            type="primary"
            block
          >
            LOGIN
          </Button>
        </div>
      </div>
      {/* <div className="w-[0] h-full box-border border-solid border-red-400 border-[50px]  border-b-[800px] border-t-transparent border-r-transparent"></div> */}
      <div className="box-border border-0 border-b-white w-0 h-0 border-r-[200px] border-solid border-r-transparent border-b-[934px] z-10"></div>
      <div className="flex items-center justify-center basis-1/2">
        <div>
          <Button block>SIGN UP</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
