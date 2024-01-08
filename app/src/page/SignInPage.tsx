import { FormEvent, useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../App";
import { UserContextType } from "../context/Types";

const auth = (window as any).auth

const SignInPage = () => {
  const { user, setUser } = useContext(UserContext) as UserContextType;

  var email = "";
  var password = "";

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await auth.signIn(email, password)
      setUser(auth.getUser());
      window.location.replace('#/');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="signInPage">
      <h1 className="mb-5 text-center">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input type="text" name="emailInput" className="form-control"
            onChange={(evt) => email = evt.target.value} />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input type="password" name="passwordInput" className="form-control"
            onChange={(evt) => password = evt.target.value} />
        </div>
        <div className="text-end">
          <a href="#/register" className="me-2">
            <button type="button" className="btn btn-secondary">Create an account</button>
          </a>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </div>
      </form>
      <Outlet />
    </div>
  );
}

export default SignInPage;