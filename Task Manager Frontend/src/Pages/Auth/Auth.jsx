import React, { useState } from "react"; // ✅ import useState
import "./Auth.css";
import Signin from "./Signin";

const Auth = () => {
  const [isRegister, setRegister] = useState(false); // ✅ corrected false

  const togglePanel = () => {
    setRegister(!isRegister);
  };

  return (
    <div className="flex justify-center h-screen items-center overflow-hidden">
      <div className="box lg:max-w-4xl">
        <div className={`cover ${isRegister ? "rotate-active" : ""}`}>
          <div className="front">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.Db_6MWnOitg4y0KrmavdKwHaEK?pid=ImgDet&w=474&h=266&rs=1&o=7&rm=3"
              alt=""
            />
            <div className="text">
              <span className="text-1">
                Success is built upon well-organized tasks
              </span>
              <span className="text-2 text-xs"> Let's get Connected </span>
            </div>
          </div>

          <div className="back">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.Y1FstaspXDnGyDKZ5mgsPQHaEK?pid=ImgDet&w=474&h=266&rs=1&o=7&rm=3"
              alt=""
            />
          </div>
        </div>

        <div className="forms h-full">
          <div className="form-content h-full">
            <div className="login-form">
              <Signin togglePannel={togglePanel} />
            </div>
            <div className="signup-form">Signup form</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
