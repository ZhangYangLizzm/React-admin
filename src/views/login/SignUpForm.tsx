import { Channels } from "@/constants/channels";
import { Input, Checkbox, Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { StatusSetter, Status } from "./status";

const SignUpForm = ({ setStatus }: StatusSetter) => {
  const [form] = useForm();

  const onSignUp = async () => {
    const values = await form.validateFields();
    if (values) {
      setStatus(Status.Login);
    }
  };

  return (
    <div style={{ width: 400 }}>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Sign Up for an Account</h1>
        <p className="text-gray-500">
          Let's get your all set up so you can creating your first onboarding
          experience.
        </p>
      </div>
      <Form
        form={form}
        layout="vertical"
      >
        <div className="flex">
          <Form.Item
            label="First Name"
            name="firstName"
            className="flex-grow"
          >
            <Input placeholder="Yout first name"></Input>
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            className="flex-grow"
          >
            <Input placeholder="Your last name"></Input>
          </Form.Item>
        </div>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input placeholder="Enter your email address" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input placeholder="Enter yout password" />
        </Form.Item>
        <Form.Item>
          <Form.Item
            noStyle
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>
              I accept BoardMe's
              <span className="text-primary ml-1">Terms & Conditions</span>
            </Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            onClick={() => onSignUp()}
            type="primary"
            block
          >
            SIGN UP
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="text-center">
            <p className="text-base text-gray-400">or sign up using</p>
            <div className="flex gap-4 px-8 justify-around">
              {Channels.map((item) => (
                <div
                  className="py-1 px-6 border border-solid border-gray-200 rounded text-xl cursor-pointer hover:shadow"
                  key={item.desc}
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
