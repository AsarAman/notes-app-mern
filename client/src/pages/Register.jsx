/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Input from "../components/Input";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const { setUpUser, user, isLoading } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const hanleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
     
      toast.error("Please provide the missing fields!", {
        theme: "colored",
      });
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setUpUser({ currentUser, endPoint: "login" });

      return;
    }
    setUpUser({ currentUser, endPoint: "register" });
  };

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigate("/notes");
      }
    }, 1000);
  }, [user, navigate]);
  return (
    <main className="main">
      <section className="register-form">
        <h1>
          {" "}
          <span>/</span> {values.isMember ? "Login" : "Register"}
        </h1>
        <div className="register">
          {!values.isMember && (
            <Input
              label={"name"}
              hanleChange={hanleChange}
              name={"name"}
              type={"text"}
            />
          )}
          <Input
            label={"email"}
            name={"email"}
            type={"text"}
            hanleChange={hanleChange}
          />
          <Input
            label={"password"}
            hanleChange={hanleChange}
            name={"password"}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            type={showPassword ? "text" : "password"}
            typePassword
          />
        </div>
        <button disabled={isLoading} className="btn" onClick={handleSubmit}>
          {isLoading ? (
            <ColorRing
              visible={true}
              colors={['blue']}
              height="20"
              width="20"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
            />
          ) : (
            "Submit"
          )}
        </button>
        <div className="toggleMember">
          <p>
            {values.isMember ? `Don't have account yet?` : "Already account?"}
          </p>
          <button onClick={toggleMember}>
            {values.isMember ? "Signup" : "Login"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Register;
