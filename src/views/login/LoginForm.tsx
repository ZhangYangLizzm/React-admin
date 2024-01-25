import { Channels } from "@/constants/channels";
import { RememberUserStorageKey } from "@/constants/storage";
import { Input, Checkbox, Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import store from "store";

const LoginForm = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onLogin = async () => {
    const values = await form.validateFields();
    if (values) {
      if (values.remember) {
        store.set(RememberUserStorageKey, values.remember);
      }
      navigate("/dashboard");
    }
  };

  return (
    <div style={{ width: 400 }}>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Log in to Your Account</h1>
        <p className="text-gray-500">
          Log in to your account so you can continue building and editing your
          onboarding flows.
        </p>
      </div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          email: "React@react.com",
          password: "React",
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Enter your email address" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password placeholder="Enter yout password" />
        </Form.Item>

        <Form.Item>
          <Form.Item
            noStyle
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>
          <a
            href="#"
            className="float-right"
          >
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            block
            onClick={() => onLogin()}
          >
            LOG IN
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="text-center">
            <p className="text-base text-gray-400">or log in using</p>
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

export default LoginForm;
