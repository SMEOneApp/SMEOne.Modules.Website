import React from "react";
import { ReactComponent as LeafIcon } from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777083095/leaf_goaken.svg";
import crm from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082007/crm_n7llam.png";
import digiWallet from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082008/digi-wallet_wct4oo.png";
import smartAccounting from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082013/smart-accounting_w7tc8a.png";
import manHome from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082711/solution_bg_compress_oc0fnl.png";
import inventorySales from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082009/inventory-sales_uqjyjr.png";
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
          <span className="label-pill problem-label">
            <LeafIcon aria-hidden="true" />
            The Solution
          </span>
          <h2>
            <span className="h2-line">Everything your business</span>
            <span className="h2-line">needs, in ONE APP</span>
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
