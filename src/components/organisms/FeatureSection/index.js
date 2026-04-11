import React from "react";
import Label from "../../atoms/Label";
import crm from "../../../assets/images/crm.png";
import digiWallet from "../../../assets/images/digi-wallet.png";
import smartAccounting from "../../../assets/images/smart-accounting.png";
import manHome from "../../../assets/images/man-home.jpg";
import inventorySales from "../../../assets/images/inventory-sales.png";
import "./styles.css";

const features = [
  {
    title: "Smart Accounting",
    image: smartAccounting,
  },
  {
    title: "Inventory and Sales",
    image: inventorySales,
  },
  {
    title: "Digital Wallet",
    image: digiWallet,
  },
  {
    title: "CRM",
    image: crm,
  },
];

const FeatureSection = () => {
  return (
    <section
      className="solution-section"
      id="solution"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(6, 78, 67, 0.72), rgba(6, 12, 39, 0.18) 36%, rgba(6, 12, 39, 0.32) 100%), url(${manHome})`,
      }}
    >
      <div className="solution-overlay" />
      <div className="solution-inner">
        <div className="solution-copy">
          <Label className="label-pill label-pill--green">The Solution</Label>
          <h2>
            Everything your business
            <br />
            needs, in ONE APP
          </h2>
          <p>
            Empower your business with cutting-edge software solutions designed
            to optimize efficiency and boost profitability.
          </p>
        </div>

        <div className="solution-grid" id="features">
          {features.map((feature) => (
            <div className="solution-card__image" key={feature.title}>
              <img src={feature.image} alt={feature.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
