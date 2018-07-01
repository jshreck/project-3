import React, { Component } from 'react';
import API from "../utils/API";
import { Grid, Row, Col, ListGroup } from "react-bootstrap";
import Item from "../components/Item";


class Main extends Component {

  state = {
    items: [],
    userId: 1
  }

  componentWillMount() {
    //grab all items for userID
    API.getItems(this.state.userId)
      .then((res) => {
        this.setState({ items: res.data });
        console.log(this.state.items)
      })
      .catch(err => console.log(err))
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