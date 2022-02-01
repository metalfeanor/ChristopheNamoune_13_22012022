import { selectUser } from "../../utils/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { fetchUserToken } from "../../features/user/user";

function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [userInput, setUserInput] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserToken(userInput));
  };

  if (user.logStatus) {
    return <Navigate to="/profile" />;
  }
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={(event) => {
                setUserInput({ ...userInput, ...{ email: event.target.value } });
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(event) => {
                setUserInput({ ...userInput, ...{ password: event.target.value } });
              }}
            />
          </div>
          <div className={user.loginError ? "sign-in-msg error" : "sign-in-msg"}>Incorrect username or password.</div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
