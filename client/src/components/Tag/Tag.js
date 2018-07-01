import React from "react";
import { Label } from "react-bootstrap";
import "./Tag.css";

const Tag = (props) => {
  return (
    <div>
      <Label className="tag" style={{ backgroundColor: props.color }}>{props.name}</Label>
    </div>
  );
};

export default Tag;