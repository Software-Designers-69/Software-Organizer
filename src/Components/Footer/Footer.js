import "./Footer.css";
import Typography from "@mui/material/Typography";

function Footer() {
  return (
    <div className="Footer">
      <footer>
        <p className="footer-text">
          Welcome to Wits Software Organiser where we will be designing and
          implementing the Kanban-based platform for organizing large software
          projects, in the vein of Taiga or Trello. You agree to have read and
          accepted our terms of use, cookie and privacy policy.
        </p>
        <p className="footer-text">
          Copyright&copy; 1999-2022 by Lion Data. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
