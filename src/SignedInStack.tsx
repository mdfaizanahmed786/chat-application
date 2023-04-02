import React, { useEffect, useState } from "react";
import App from "./App";
import { useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

type Props = {};

const SignedInStack = (props: Props) => {
  const location = useLocation();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token") as string);
    if (!user) {
      window.location.replace("/login");
    }
  }, [location.pathname]);

  return (
    <>
      <App location={location.pathname} />
    </>
  );
};

export default SignedInStack;
