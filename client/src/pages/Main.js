import React, { Component } from 'react';
import API from "../utils/API";
import { Grid, Row, Col, ListGroup, FormGroup, FormControl } from "react-bootstrap";
import Item from "../components/Item";
import Tag from "../components/Tag";
import defaultTags from '../utils/defaultTags';
import './Main.css';



class Main extends Component {

  state = {
    items: [],
    userId: null,
    availableTags: [],
    filteredTags: []
  };

  componentWillMount() {

    const user = JSON.parse(sessionStorage.user);
    this.setState({ userId: user.id }, () => {
      this.getItems();

      API.getUserTags(this.state.userId)
        .then((res) => {
          // this.setState({ availableTags: defaultTags.concat(res.data) });
          const tags = defaultTags.concat(res.data);
          tags.forEach((tag) => {
            tag.selected=false;
          });
          this.setState({availableTags: tags});
          console.log("Available Tags: " + JSON.stringify(this.state.availableTags));
        })
        .catch(err => console.log(err));
    });
  }

  //grab all items for userID
  getItems = () => {
    API.getItems(this.state.userId)
      .then((res) => {
        res.data.forEach((item) => {
          item.tags = item.tags.split(",");
          item.tags.pop(); //added .pop to get rid of "" @ the end
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


  handleTagClick = (e) => {
    //changed "selected" for css
    const availableTags = this.state.availableTags;
    availableTags.forEach((tag) => {
      if (tag.id.toString() === e.target.id.toString()) {
        tag.selected = !tag.selected;
      }
    });
    this.setState({availableTags: availableTags});

    //if tag id in array take it out, otherwise put it in -> then filter by all tags in that array
    let filteredTags = this.state.filteredTags;
    if (filteredTags.includes(e.target.id)) {
      const index = filteredTags.indexOf(e.target.id);
      if (index !== -1) filteredTags.splice(index, 1);
    }
    else {
      filteredTags.push(e.target.id);
    }
    console.log("tags to filter by" + filteredTags);
    this.setState({ filteredTags: filteredTags }, this.filterByTags());
  }

  filterByTags = () => {
    if (!this.initialState) this.initialState = this.state.items;
    const updatedList = this.initialState.filter((item) => {
      // const updatedList = this.state.items.filter((item) => {
      if (item.tags.length > 0) {
        const tags = item.tags.map(tag => tag.id.toString());
        console.log("item = " + item.name + "tags =" + tags);
        const filteredTags = this.state.filteredTags;
        // return (tags.some(ele => filteredTags.includes(ele)));
        return (!filteredTags.some(ele => !tags.includes(ele)));
      }
      else {
        return false;
      }
    });

    this.setState({ items: updatedList });
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
            <div className="tag-list">
              {this.state.availableTags.map((tag, i) => (
                <Tag className={tag.selected ? 'selected-tag': null} id={tag.id} name={tag.name} color={tag.color} txtColor={tag.txtColor} key={i} onClick={this.handleTagClick} />
              ))}
            </div>
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