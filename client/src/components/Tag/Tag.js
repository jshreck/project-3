import React from "react";
import { Label } from "react-bootstrap";


const Tag = (props) => {
  return (
    <div>
      <Label className="tag" style={{ backgroundColor: props.color, color:props.txtColor }} id={props.id} onClick={props.onClick}>{props.name}</Label>
    </div>
  );
};

export default Tag;