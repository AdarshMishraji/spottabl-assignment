import React, { Children } from "react";
import "./index.css";

type Props = {
  children?: React.ReactNode;
  headerText?: string;
};

const Card = ({ children }: Props) => {
  return <div className="card">{children}</div>;
};

Card.Title = ({ headerText }: Props) => (
  <div className="card-header-text">{headerText}</div>
);

Card.Body = ({ children }: Props) => {
  const bodyChildren: Array<React.ReactNode> = [];
  Children.forEach(children, (child) => {
    bodyChildren.push(child);
  });
  return <div className="card-body">{bodyChildren.map((child) => child)}</div>;
};

export { Card };
