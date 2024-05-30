import { MenuItem, Select } from "@mui/material";
import "./footer.scss";
import Logo from "../Logo/Logo";

export default function Footer({ props }) {
  return (
    <footer>
      <div className="container">
        <div className="actions">
          <div className="lang">
            <select id="lang-select">
              <option value="en">English</option>
              <option value="uk">Українська</option>
            </select>
          </div>
          <div className="mobile-app">
            <button>
              <img src="http://mobile-app"></img>
              <span>Download mobile app</span>
            </button>
          </div>
        </div>
        <div className="info">
          <ul className="list">
            <li className="title">Discover</li>
            <li>
              <a href="#">Bicycle roads</a>
            </li>
            <li>
              <a href="#">Interesting places</a>
            </li>
            <li>
              <a href="#">Find path</a>
            </li>
            <li>
              <a href="#">Rider premium</a>
            </li>
            <li>
              <a href="#">Invite friends</a>
            </li>
            <li>
              <a href="#">Rider app</a>
            </li>
          </ul>
          <ul className="list">
            <li className="title">Rider</li>
            <li>
              <a href="#">About rider</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="contacts">
          <div className="brand">
            <div className="service">
              <Logo />
              <div className="version-block">
                <span className="name">Rider</span>
                <span className="version">version 1.0.0</span>
              </div>
            </div>
            <span>Made in Ukraine with 💖</span>
          </div>
          <div className="socials">
            <ul>
              <li>
                <img src="http://facebook" />
              </li>
              <li>
                <img src="http://twitter" />
              </li>
              <li>
                <img src="http://instagram" />
              </li>
              <li>
                <img src="http://youtube" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
