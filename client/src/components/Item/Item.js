import React from 'react';
import { ListGroupItem, Panel } from "react-bootstrap";
import Tag from "../Tag";
import "./Item.css";


const Item = (props) => {
  return (
    <ListGroupItem>
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            {props.itemName}
            <div className="tags"><Tag color="pink" name="pink"/><Tag color="yellow" name="yellow"/><Tag color="red" name="red" /><Tag color="turquoise" /></div>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            Can include extra info
            </Panel.Body>
        </Panel.Collapse>
      </Panel>
    </ListGroupItem>
  )
}




export default Item;