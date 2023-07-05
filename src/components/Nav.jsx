import { NavLink } from "react-router-dom";

export default function Nav(props) {
  const { user } = props;

  return (
    <nav>
      <div className="page-header">
        <div className="home">
          <NavLink to="/">Home </NavLink>
        </div>

        
          {user ? (
            <>
              <div className="welcome-nav">Welcome! {user.name}</div>
              <div className="signOut">
                <NavLink to="/sign-out">Sign Out</NavLink>
              </div>
            </>
          ) : (
            <div className="signInOut">
              <NavLink className="sign-up-nav" to="/sign-up">
                Sign Up
              </NavLink>
              <NavLink className="sign-in-nav" to="/sign-in">
                Sign In
              </NavLink>
            </div>
          )}
        </div>
      {/* </div> */}
    </nav>
  );
}