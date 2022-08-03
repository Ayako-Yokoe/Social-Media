import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
  }, []);

  return <div>home</div>;
};

export default Home;
