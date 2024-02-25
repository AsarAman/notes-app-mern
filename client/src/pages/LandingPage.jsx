/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";

function LandingPage() {
  return (
    <main className="main">
      <article className="welcome-content">
        <div className="welcome-text">
          <Title title={'Welcome to notes app'}/>
          <p>One Safe place for all your notes</p>
        </div>
        <div className="buttons">
          <Link to={"/register"} className="btn login-btn">
            login
          </Link>
          <Link to={"/register"} className="btn signup-btn">
            {" "}
            sign up
          </Link>
        </div>
      </article>
    </main>
  );
}

export default LandingPage;
