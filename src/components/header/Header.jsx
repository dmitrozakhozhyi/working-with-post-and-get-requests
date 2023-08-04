import './header.sass';
import { Link } from 'react-scroll';
import logo from '../../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">
            <img src={logo} alt="logo testtask" width="104px" />
          </div>
          <div className="header__actions">
            <Link
              to="users"
              smooth={true}
              offset={-100}
              duration={500}
              className="button"
            >
              Users
            </Link>
            <Link
              to="form"
              smooth={true}
              offset={-100}
              duration={800}
              className="button"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
