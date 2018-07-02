import React from 'react';
import { ListGroupItem, Panel } from "react-bootstrap";
import Tag from "../Tag";
import "./Item.css";
import defaultTags from '../../utils/defaultTags';


const Item = (props) => {
  // csv -> array, define as empty array first in case no tags (prevents error)
  let tags = [];
  tags = props.tags.split(',');
  // user created tags
  const userTags = props.userTags;

  //going through tags of item 
  tags.forEach((tag, i) => {

    // goes through each user created tag, if a match, replace the mains "tag" with all the info
    userTags.forEach((userTag, j) => {
      if (tag === userTag.id.toString()) {
        tags.splice(i, 1, userTag);
      }
      //if no match goes through the default tags and replaces the main "tag" with all the info
      else {
        defaultTags.forEach((defaultTag, k) => {
          if (tag === defaultTag.id) {
            tags.splice(i, 1, defaultTag);
          }
        })
      }
    });
  });

  return (
    <ListGroupItem>
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            {props.itemName}
            <div className="tags">
              {tags.map((tag, i) => (
                <Tag name={tag.name} color={tag.color} txtColor={tag.txtColor} key={i} />
              ))}
            </div>
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