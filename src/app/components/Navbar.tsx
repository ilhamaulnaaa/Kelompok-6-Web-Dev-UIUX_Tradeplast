import Link from "next/link";
import "@/app/styles/styles.css";

export default function Navbar() {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
  ];

  return (
    <div className="navbarContainer">
      <div className="navbarLogo">
        <div className="logoIcon">
          <div className="logoIconLine" />
        </div>
        <div className="plasticIcon">
          <div className="plasticIconSmall" />
          <div className="plasticIconLarge" />
        </div>
      </div>
      <div className="navbarMenu">
        <div className="navbarMenuItem">Dashboard</div>
        <div className="navbarMenuItem">Katalog</div>
        <div className="navbarMenuItem">Withdraw</div>
        <div className="navbarMenuItem">Sell</div>
        <div className="navbarMenuItem">Maps</div>
      </div>
      <div className="navbarLogin">
        <div className="loginButton">
          <div className="loginIcon">
            <div className="loginIconInner" />
          </div>
        </div>
        <div className="loginText">
          <div className="loginTextLabel">Log In</div>
        </div>
      </div>
    </div>
  );
}
