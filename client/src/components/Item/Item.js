import React from 'react';
import { ListGroupItem, Panel, Button } from "react-bootstrap";
import Tag from "../Tag";
import "./Item.css";



const Item = (props) => {
  // csv -> array, define as empty array first in case no tags (prevents error)
  // let tags = [];
  // tags = props.tags.split(',');
  let tags = props.tags;
  //available tags (default + user specific)
  const availableTags = props.availableTags;

  //going through tags of item 
  tags.forEach((tag, i) => {

    // goes through available tags, if a match, replace the main "tag" with all the info for tag
    availableTags.forEach((availableTag, j) => {
      if (tag === availableTag.id.toString()) {
        tags.splice(i, 1, availableTag);
      }
    });
  });

  return (
    <ListGroupItem>
      <Panel className="list-item">
        <Panel.Heading>
          <Panel.Title toggle>
            {props.name} 
          </Panel.Title>
          <Button className="delete-item pull-right" bsStyle="danger" id={props.id} onClick={props.deleteItem}>X</Button>
          <Button className="edit-item pull-right" bsStyle="custom" id={props.id} onClick={props.editItem}>Edit</Button>
          <div className="tags">
              {tags.map((tag, i) => (
                <Tag name={tag.name} color={tag.color} txtColor={tag.txtColor} key={i} />
              ))}
            </div>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <h5>Exp Date:</h5><span>{props.expDate}</span>
            <h5>Notes:</h5>
            <p>
            {props.note || "N/A"}
            </p>
            </Panel.Body>
        </Panel.Collapse>
      </Panel>
    </ListGroupItem>
  )
}




export default Item;