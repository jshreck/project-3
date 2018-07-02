import React, { Component } from 'react';
import API from "../utils/API";
import { Grid, Row, Col, ListGroup } from "react-bootstrap";
import Item from "../components/Item";


class Main extends Component {

  state = {
    items: [],
    userId: 1,
    userTags: []
  }

  componentWillMount() {
    //grab all items for userID
    API.getItems(this.state.userId)
      .then((res) => {
        this.setState({ items: res.data });
        console.log("Items: " + this.state.items);
      })
      .catch(err => console.log(err))

    API.getUserTags(this.state.userId)
    .then((res) => {
      this.setState({userTags: res.data});
      console.log("UserTags: " + this.state.userTags);
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            <ListGroup>
              {this.state.items.map((item, i) => (
                <Item
                  key={i}
                  id={item.id}
                  itemName={item.name}
                  tags={item.tags}
                  userTags={this.state.userTags}
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