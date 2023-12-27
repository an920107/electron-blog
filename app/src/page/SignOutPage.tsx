import React, { useContext, useEffect } from "react";
import { UserContextType } from "../context/Types";
import { UserContext } from "../App";
import { Outlet } from "react-router-dom";

const auth = (window as any).auth

const SignOutPage = () => {
  const { user, setUser } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    auth.signOut();
    setUser(undefined);
    window.location.replace('#/login');
  }, []);

  return (
    <div className="signOutPage">
      <Outlet />
    </div>
  );
}

export default SignOutPage;