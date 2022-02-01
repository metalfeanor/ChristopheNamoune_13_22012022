import { selectUser } from "../../utils/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/argentBankLogo.png";
import { logout } from "../../features/user/user";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {!user.logStatus ? (
        <div>
          <Link className="main-nav-item" to="/login">
            <span className="fa fa-user-circle right"></span>
            Sign In
          </Link>
        </div>
      ) : (
        <div className="main-nav-logout">
          <span className="fa fa-user right user"></span>
          <span className="name">{user.firstName}</span>
          <Link className="main-nav-item" to="/" onClick={() => dispatch(logout())}>
            <i className="fa fa-sign-out right sign-out-icon"></i>
            Sign Out
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
