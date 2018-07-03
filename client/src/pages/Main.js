import React, { Component } from 'react';
import API from "../utils/API";
import { Grid, Row, Col, ListGroup } from "react-bootstrap";
import Item from "../components/Item";
import Tag from "../components/Tag";
import defaultTags from '../utils/defaultTags';



class Main extends Component {

  state = {
    items: [],
    userId: 1,
    availableTags: []
  };

  componentWillMount() {
    //grab all items for userID
    API.getItems(this.state.userId)
      .then((res) => {
        this.setState({ items: res.data });
        console.log("Items: " + JSON.stringify(this.state.items));
      })
      .catch(err => console.log(err))

    //grab user specific tags and create all available tags
    API.getUserTags(this.state.userId)
    .then((res) => {
      this.setState({availableTags: defaultTags.concat(res.data)});
      console.log("Available Tags: " + JSON.stringify(this.state.availableTags));
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
          {this.state.availableTags.map((tag,i) => (
 <Tag name={tag.name} color={tag.color} txtColor={tag.txtColor} key={i} />
          ))}
          </Col>
          </Row>
          <Row>
          <Col xs={12} md={8}>
            <ListGroup>
              {this.state.items.map((item, i) => (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  tags={item.tags}
                  availableTags={this.state.availableTags}
                  note={item.note}
                  expDate={item.exp_date}
                />
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Main;