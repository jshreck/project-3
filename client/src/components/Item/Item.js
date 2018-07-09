import React from 'react';
import { ListGroupItem, Panel, Button } from "react-bootstrap";
import Tag from "../Tag";
import "./Item.css";



const Item = (props) => {
  // csv -> array, define as empty array first in case no tags (prevents error)
  let tags = [];
  tags = props.tags.split(',');
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
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            {props.name} <Button id={props.id} onClick={props.deleteItem}>X</Button>
            <div className="tags">
              {tags.map((tag, i) => (
                <Tag name={tag.name} color={tag.color} txtColor={tag.txtColor} key={i} />
              ))}
            </div>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            {props.expDate}
            {props.note}
            </Panel.Body>
        </Panel.Collapse>
      </Panel>
    </ListGroupItem>
  )
}




export default Item;