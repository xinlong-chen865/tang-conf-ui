import { Form } from "@react-components/index";
import { useState } from "react";

const LoginPage = () => {

    const [showHelp, setShowHelp] = useState(false);

    const login = async (body: { email: string; password?: string }) => {
        alert(1);
    };
    return (
        <div className="max-w-md w-full m-auto mt-20 bg-white shadow rounded-lg p-7">
            <div className="text-center">
                <h1 className="text-3xl font-bold">
                    登录您的账号
                </h1>
                <p className="mt-2 text-gray-500">
                    或者,
                    <a href="/auth/register" className="text-indigo-600 hover:text-indigo-900 font-medium">创建您的账号</a>
                </p>
            </div>
            <Form
                onSubmit={login}
                items={[{ name: 'email', type: 'email', label: '邮箱', required: true }, { name: 'password', type: 'password', label: '密码' }]}
                submitText="Login to your account"
            />
            <div className="mt-5 text-sm text-center">
                <div>
                    <button
                        onClick={() => (setShowHelp(!showHelp))}
                        className="text-indigo-600 hover:text-indigo-900 font-medium">Need help?</button>
                </div>
                {
                    showHelp && (
                        <div
                            className="bg-white shadow sm:rounded-lg p-4 mt-3 text-left text-gray-600"
                        >
                            <nav className="space-y-2">
                                <p>
                                    如果您无法登录，您可以
                                    <a href="/auth/forgot" className="text-indigo-600 hover:text-indigo-900 font-medium">重置密码</a>.
                                </p>
                                <p>
                                    如果你没有收到验证电子邮件的链接，你可以
                                    <a href="/auth/resend" className="text-indigo-600 hover:text-indigo-900 font-medium">重新发送电子邮件验证</a>
                                    几分钟后.
                                </p>
                            </nav>
                        </div>
                    )
                }
            </div>
        </div>
    )
};

export default LoginPage;