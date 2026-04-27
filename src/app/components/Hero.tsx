import "@/app/styles/styles.css";

export default function Hero() {
  return (
    <div className="heroContainer">
      <div className="heroContent">
        <div className="heroSection">
          <div className="heroTitle">Make money and contribute to the green environment</div>
        </div>
        <div className="heroSection">
          <div className="heroDescription">Make a change to the environment and also making money</div>
        </div>
        <div className="heroButton">
          <div className="buttonText">Make a change</div>
        </div>
        <div className="heroSection">
          <div className="heroSubtext">Contribute to the green earth with our innovative recycling solutions.</div>
        </div>
      </div>
      <div className="heroImage">
        <img src="google.com" alt="Hero Image" />
      </div>
    </div>
  );
}
