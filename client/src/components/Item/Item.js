import React, { Component } from 'react';
import { Panel } from "react-bootstrap";
import Tag from "../Tag";
import "./Item.css";
class Item extends Component {

  render() {
    return (
    <Panel>
          <Panel.Heading>
            <Panel.Title toggle>
              {this.props.name}
              <div className="tags"><Tag color="pink"/><Tag color="yellow"/><Tag color="red"/><Tag color="turquoise"/></div>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              Can include extra info
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
    )
}
  

}

export default Item;