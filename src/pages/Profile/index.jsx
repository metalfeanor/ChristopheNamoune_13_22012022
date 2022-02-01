import { selectUser } from "../../utils/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserInfo, fetchUpdateUserInfo } from "../../features/user/user";

function Profile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const token = user.token;
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  /*const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));
    setFirstNameInput("");
    setLastNameInput("");
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUpdateUserInfo(firstNameInput, lastNameInput, token, () => setIsEditing(false)));
  };

  useEffect(() => {
    dispatch(fetchUserInfo(token));
  }, [dispatch, token]);

  if (!user.logStatus) {
    return <Navigate to="/login" />;
  }
  return (
    <main className="main bg-grey">
      <div className="header">
        <h1>
          Welcome back <br />
          {isEditing ? "" : `${user.firstName} ${user.lastName}!`}
        </h1>
        {isEditing ? (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="header-form-group">
              <label className="sr-only" htmlFor="firstname">
                Firstname
              </label>
              <input
                className="form-input"
                type="text"
                id="firstname"
                defaultValue={user.firstName}
                onChange={(event) => setFirstNameInput(event.target.value)}
                required
              />
              <label className="sr-only" htmlFor="lastname">
                Lastname
              </label>
              <input
                className="form-input"
                type="text"
                id="lastname"
                defaultValue={user.lastName}
                onChange={(event) => setLastNameInput(event.target.value)}
                required
              />
            </div>
            <div className="header-form-group">
              <button className="edit-button" type="submit">
                Save
              </button>
              <button
                className="edit-button"
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  //handleReset();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            className="edit-button"
            type="button"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <div className="account-line">
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;
