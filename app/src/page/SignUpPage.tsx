import { FormEvent, useContext } from "react";
import { Outlet } from "react-router-dom";
import User from "../model/user";
import { UserContext } from "../App";
import { UserContextType } from "../context/Types";

const auth = (window as any).auth;

const RegisterPage = () => {
  const { user, setUser } = useContext(UserContext) as UserContextType;

  var displayName = "";
  var email = "";
  var password = "";
  var passwordConfirm = "";

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      if (password !== passwordConfirm)
        throw new Error("Password and password confirm are not match.");
      if (password.length < 8)
        throw new Error("Password must be at least 8 characters.");

      await auth.signUp({
        email: email,
        displayName: displayName,
      } as User, password);
      setUser(auth.getUser());
      window.location.replace("#/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="signUpPage">
      <h1 className="mb-5 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="displayNameInput" className="form-label">Display name</label>
          <input type="text" name="displayNameInput" className="form-control"
            onChange={(evt) => displayName = evt.target.value} />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input type="text" name="emailInput" className="form-control"
            onChange={(evt) => email = evt.target.value} />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInputGroup" className="form-label">Password and confirm</label>
          <div className="passwordInputGroup">
            <input type="password" className="form-control mb-2"
              onChange={(evt) => password = evt.target.value} />
            <input type="password" className="form-control"
              onChange={(evt) => passwordConfirm = evt.target.value} />
          </div>
        </div>
        <div className="text-end">
          <button type="submit" className="btn btn-primary">Sign up</button>
        </div>
      </form>
      <Outlet />
    </div>
  );
}

export default RegisterPage;