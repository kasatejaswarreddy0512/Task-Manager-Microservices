import React, { useState } from "react"; // ✅ import useState
import "./Auth.css";
import Signin from "./Signin";
import Signup from "./Signup";

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
              src="https://images.freecreatives.com/wp-content/uploads/2015/03/Huge-Backgrounds-63.jpg"
              alt=""
            />
            <div className="text">
              <span className="text-1">
                Great goals are reached through disciplined execution.
              </span>
              <span className="text-2 text-xs ">
                Let’s connect and create impact.
              </span>
            </div>
          </div>

          <div className="back">
            <img
              src="https://reddometta.com/wp-content/uploads/2020/10/website-design-background-1-1.jpg"
              alt=""
            />
            <div className="text">
              <span className="text-1 quote">
                Meaningful results come from consistent, purposeful effort.
              </span>
              <span className="text-2 text-xs">
                Join us in shaping the future.
              </span>
            </div>
          </div>
        </div>

        <div className="forms h-full">
          <div className="form-content h-full">
            <div className="login-form ">
              <Signin togglePannel={togglePanel} />
            </div>
            <div className="signup-form">
              <Signup togglePannel={togglePanel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
