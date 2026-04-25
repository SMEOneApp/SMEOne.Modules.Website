import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as LeafIcon } from "../../../assets/images/svg assets/leaf.svg";
import { ReactComponent as TrackIcon } from "../../../assets/images/svg assets/track.svg";
import { ReactComponent as CustomersIcon } from "../../../assets/images/svg assets/customers.svg";
import { ReactComponent as DollarIcon } from "../../../assets/images/svg assets/dollar.svg";
import { ReactComponent as BoxIcon } from "../../../assets/images/svg assets/box.svg";
import "./styles.css";

// Cloudinary-hosted PNGs — passed straight to <img src> so no module import needed.
const smiling = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082003/2.00_kgm9qx.png";
const yellowJacket = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082016/yellow-jacket_x978sa.png";
const ipadGuy = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082003/3.00_jiwzcl.png";

const problems = [
  {
    icon: <TrackIcon aria-hidden="true" />,
    title: "Tracking sales manually is stressful",
    description:
      "Keeping up with daily transactions across notebooks and spreadsheets",
  },
  {
    icon: <CustomersIcon aria-hidden="true" />,
    title: "Managing customers across apps is messy",
    description:
      "Customer data scattered everywhere makes follow-ups impossible",
  },
  {
    icon: <DollarIcon aria-hidden="true" />,
    title: "You don't always know your real profit",
    description:
      "Without clear insights, you might be losing money without realizing it",
  },
  {
    icon: <BoxIcon aria-hidden="true" />,
    title: "Payments and cash flow are hard to track",
    description:
      "Missing payments and unclear balances create constant uncertainty",
  },
];

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionNode = sectionRef.current;

    if (!sectionNode) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    observer.observe(sectionNode);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`problem-section${isVisible ? " problem-section--visible" : ""}`}
      id="problem"
    >
      <div className="problem-shell">
        <div className="problem-copy">
          <span className="label-pill problem-label">
            <LeafIcon aria-hidden="true" />
            The Problem
          </span>
          <h2>
            Running a business shouldn't feel <span>this hard</span>
          </h2>

          <div className="problem-float problem-float--1">
            <img src={yellowJacket} alt="Business owner portrait" />
          </div>
          <div className="problem-float problem-float--2">
            <img src={smiling} alt="Business owner portrait" />
          </div>
          <div className="problem-float problem-float--3">
            <img src={ipadGuy} alt="Business owner portrait" />
          </div>
        </div>

        <div className="problem-list">
          {problems.map((problem, index) => (
            <article
              className="problem-item"
              key={problem.title}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="problem-item__icon" aria-hidden="true">
                {problem.icon}
              </div>
              <div>
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
