import React, { useEffect, useRef, useState } from "react";
import Label from "../../atoms/Label";
import smiling from "../../../assets/images/smiling.png";
import yellowJacket from "../../../assets/images/yellow-jacket.png";
import ipadGuy from "../../../assets/images/ipad-guy.png";
import "./styles.css";

const problems = [
  {
    icon: "↘",
    title: "Tracking sales manually is stressful",
    description:
      "Keeping up with daily transactions across notebooks and spreadsheets",
  },
  {
    icon: "◎",
    title: "Managing customers across apps is messy",
    description:
      "Customer data scattered everywhere makes follow-ups impossible",
  },
  {
    icon: "$",
    title: "You don't always know your real profit",
    description:
      "Without clear insights, you might be losing money without realizing it",
  },
  {
    icon: "◫",
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
          <Label className="label-pill label-pill--green">The Problem</Label>
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
