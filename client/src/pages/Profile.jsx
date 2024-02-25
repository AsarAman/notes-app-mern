/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useAppContext } from "../context/appContext";
import Title from "../components/Title";
import Input from "../components/Input";
import { toast } from "react-toastify";
function Profile() {
  const { user, updateUser, isLoading, logOutUser } = useAppContext();
  const { name, email } = user;
  const initialState = {
    name: name,
    email: email,
    password: "",
    picture: "",
  };
  const [profile, setProfile] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    
    setProfile({ ...profile, [e.target.name]: e.target.value });
  

    if (e.target.files) {
      const imgFile = e.target.files[0];

      const reader = new FileReader();
      if (imgFile) {
        reader.readAsDataURL(imgFile);
      }
      reader.onload = () => {
        setProfile({ ...profile, picture: reader.result });
      };
      reader.onerror = () => {
        console.log("error");
      };
    }
  };
  

  const submit = () => {
    const { name, email, password, picture } = profile;
    if (!name || !email || !password) {
      return toast.error("Please provide all required fields", {
        theme: "colored",
      });
    }
    if ((name, email, password)) {
      

      const currentUser = {
        name: name,
        email: email,
        password: password,
        picture: picture,
      };
      updateUser({ currentUser, endPoint: "update" });
    }
  };
  return (
    <main className="section">
      <div className="log-out">
        <Title title={"Your Profile"} />
        <button onClick={logOutUser} className="btn">Logout</button>
      </div>

      <hr className="hr"></hr>
      <section className="profile-section">
        <article className="user-info">
          <Input
            label={"name"}
            value={profile.name}
            hanleChange={handleSubmit}
            name={"name"}
          />
          <Input
            label={"email"}
            value={profile.email}
            hanleChange={handleSubmit}
            name={"email"}
          />
          <Input
            label={"password"}
            value={profile.password}
            hanleChange={handleSubmit}
            name={"password"}
            type={showPassword ? "text" : "password"}
            typePassword
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />
          <Input
            label={"picture"}
            type={"file"}
            accept={"image/*"}
            hanleChange={handleSubmit}
            name={"picture"}
          />
          <button
            disabled={isLoading}
            style={{
              opacity: isLoading ? ".75" : "1",
              cursor: isLoading ? "wait" : "pointer",
            }}
            className="btn"
            onClick={submit}
          >
            Submit
          </button>
        </article>

        <article className="user-profile">
          {user.profile && <img alt={user.name} src={user.profile} />}
        </article>
      </section>
    </main>
  );
}

export default Profile;
