import { ConfigProvider } from "antd";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { StatusSetter, Status } from "./status";
import Tip from "./Tip";

const SignUpTip = ({ setStatus }: StatusSetter) => {
  return (
    <Tip
      title="Don't have an Account Yet?"
      desc="Let's get your all set up so you can creating your first onboarding
    experience."
      buttonText="SIGN UP"
      setStatus={(status) => setStatus(status)}
    />
  );
};

const LoginTip = ({ setStatus }: StatusSetter) => {
  return (
    <Tip
      title="Already Signed Up?"
      desc=" Log in to your account so you can continue building and editing your
        onboarding flows."
      buttonText="LOG IN"
      setStatus={(status) => setStatus(status)}
    />
  );
};

const Login = () => {
  const [status, setStatus] = useState(Status.Login);

  return (
    <ConfigProvider
      componentSize="large"
      theme={{ components: { Button: { borderRadius: 0 } } }}
    >
      <div className="w-full h-full flex justify-between relative">
        <h2
          className={
            "left-4 top-0 absolute z-10 " +
            (status === Status.Login ? "text-primary" : "text-white")
          }
        >
          React
        </h2>
        <div
          className={
            "flex items-center justify-center bg-white basis-1/2 transition-all  absolute top-0 h-full w-1/2 " +
            (status === Status.Login ? "left-0" : "left-1/2")
          }
        >
          {status === Status.Login ? (
            <LoginForm />
          ) : (
            <SignUpForm setStatus={(status) => setStatus(status)} />
          )}
        </div>
        <div
          className={
            "basis-1/2 bg-primary flex transition-all absolute top-0 h-full w-1/2  " +
            (status === Status.SignUp ? "right-1/2" : "right-0")
          }
        >
          <div
            className={
              `box-border border-0  w-0 h-0 border-r-[200px] border-solid border-r-transparent ` +
              (status === Status.Login
                ? "order-1 border-b-[100vh] border-b-white bg-primary"
                : "order-2 border-t-[100vh] border-t-primary bg-white")
            }
          />
          <div
            className={
              "flex items-center justify-center flex-grow " +
              (status === Status.Login ? "order-2" : "order-1")
            }
          >
            {status === Status.Login ? (
              <SignUpTip setStatus={(status) => setStatus(status)} />
            ) : (
              <LoginTip setStatus={(status) => setStatus(status)} />
            )}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
