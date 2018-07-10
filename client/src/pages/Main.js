import React, { Component } from 'react';
import API from "../utils/API";
import { Grid, Row, Col, ListGroup, FormGroup, FormControl } from "react-bootstrap";
import Item from "../components/Item";
import Tag from "../components/Tag";
import defaultTags from '../utils/defaultTags';



class Main extends Component {

  state = {
    items: [],
    userId: 1,
    availableTags: []
  };

  //grab all items for userID
  getItems = () => {
    API.getItems(this.state.userId)
      .then((res) => {
        res.data.forEach((item) => {
          item.tags = item.tags.split(",");
        });
        this.setState({ items: res.data });
        console.log("Items: " + JSON.stringify(this.state.items));
      })
      .catch(err => console.log(err))
  }

  initialState;
  searchItems = (e) => {
    if (!this.initialState) this.initialState = this.state.items;
    console.log(e.target.value);
    let updatedList = this.initialState.filter((item) => {
      return item.name.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    });
    this.setState({ items: updatedList });
  }

  // filteredIds = [];

  // getItemsByTag = (e) => {
  //   console.log(e.target.id);
  //   console.log(this.state.items[1]);
  //   let updatedList = this.state.items.filter((item) => item.tags.includes(e.target.id));
  //   console.log(updatedList);
  //   this.setState({ items: updatedList });
  // }

  componentWillMount() {
    this.getItems();

    //grab user specific tags and create all available tags
    API.getUserTags(this.state.userId)
      .then((res) => {
        this.setState({ availableTags: defaultTags.concat(res.data) });
        console.log("Available Tags: " + JSON.stringify(this.state.availableTags));
      })
      .catch(err => console.log(err));
  }

  //delete Item
  deleteItem = (e) => {
    console.log(e.target.id
    );
    const id = e.target.id;
    API.deleteItem(id)
      .then((res) => {
        console.log(res);
        this.getItems();
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            {this.state.availableTags.map((tag, i) => (
              <Tag id={tag.id} name={tag.name} color={tag.color} txtColor={tag.txtColor} key={i} onClick={this.getItemsByTag}/>
            ))}


            <FormGroup>
              <FormControl type="text" placeholder="Search" onChange={this.searchItems} />
            </FormGroup>{' '}

          </Col>
        </Row>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
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
                  deleteItem={this.deleteItem}
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