import { useState } from "react";
import { set } from "react-hook-form";

function ForgotPassword() {
  const [getEmail, setGetEmail] = useState();
  const [email, setEmail] = useState();

  const handleData = () => {
    const getemail = {
      email: email,
    };
    setGetEmail(getemail);
  };

  return (
    <body className="flex flex-col h-screen w-screen justify-center">
      <div className="flex flex-col w-full justify-center items-center">
        <div>i-Move</div>
        <div>FORGOT PASSWORD</div>
        <br />
      </div>
      <div className="flex flex-col">
        <label htmlFor="forgotpassword" className="block flex flex-start">
          Enter Your E-Mail: <br />
        </label>
        <input
          type="email"
          id="forgotpassword"
          name="forgotpassword"
          className="border p-2 w-full"
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button
        type="summit"
        className="bg-sky-900 box-border w-32 border-4 mt-4"
        onClick={handleData}
      >
        Summit
      </button>
    </body>
  );
}

export default ForgotPassword;