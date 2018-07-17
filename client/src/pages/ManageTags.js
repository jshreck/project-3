import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import API from "../utils/API";
import defaultTags from '../utils/defaultTags';
import Tag from '../components/Tag';
import './ManageTags.css';


class ManageTags extends Component {

    state = {
        userId: null,
        availableTags: [],
        tagName: "",
        txtColor: "",
        color: "",
    }

    handleNameChange = (e) => {
        this.setState({ tagName: e.target.value }, () => {
            console.log("name " + this.state.tagName);
        });
    }
    handleColorChange = (e) => {
        this.setState({ color: e.target.value }, () => {
            console.log("color " + this.state.color);
        });
    }
    handleTxtColorChange = (e) => {
        this.setState({ txtColor: e.target.value }, () => {
            console.log("txtcolor " + this.state.txtColor);
        });
    }
    clearForm = () => {
        this.setState({ tagName: "", color: "", txtColor: "" });
    }

    addTag = (e) => {
        e.preventDefault();

        API.addTag({
            name: this.state.tagName,
            color: this.state.color,
            txtColor: this.state.txtColor,
            UserId: this.state.userId
        })
        .then(() => {
            console.log("added tag");
            this.clearForm();
            API.getUserTags(this.state.userId)
            .then((res) => {
                    this.setState({ availableTags: defaultTags.concat(res.data) });
                    console.log("Available Tags: " + JSON.stringify(this.state.availableTags));
            })
            .catch(err => console.log(err));
            })
        .catch(err => console.log(err))
    }


    componentWillMount() {

        const user = JSON.parse(sessionStorage.user);
        this.setState({ userId: user.id }, () => {

            API.getUserTags(this.state.userId)
                .then((res) => {
                    this.setState({ availableTags: defaultTags.concat(res.data) });
                    console.log("Available Tags: " + JSON.stringify(this.state.availableTags));
                })
                .catch(err => console.log(err));
        });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={8} mdOffset={2}>
                        <div className="manage-tag-list">
                            {this.state.availableTags.map((tag, i) => (
                                <Tag id={tag.id} name={tag.name} color={tag.color} txtColor={tag.txtColor} key={i} onClick={this.handleTagClick} />
                            ))}
                        </div>
                        <hr />
                    </Col>
                </Row>
                <form>
                    <Row>
                        <Col xs={12} md={4} mdOffset={2}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Color</ControlLabel>
                                <FormControl componentClass="select" placeholder="select" onChange={this.handleColorChange}>
                                    <option value="select">select</option>
                                    <option value="red">red</option>
                                    <option value="orange">orange</option>
                                    <option value="yellow">yellow</option>
                                    <option value="blue">blue</option>
                                    <option value="green">green</option>
                                    <option value="purple">purple</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={4}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Text Color</ControlLabel>
                                <FormControl componentClass="select" placeholder="select" onChange={this.handleTxtColorChange}>
                                    <option value="select">select</option>
                                    <option value="black">black</option>
                                    <option value="white">white</option>
                                    <option value="red">red</option>
                                    <option value="orange">orange</option>
                                    <option value="yellow">yellow</option>
                                    <option value="blue">blue</option>
                                    <option value="green">green</option>
                                    <option value="purple">purple</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4} mdOffset={2}>
                        <FormGroup>
                            <FormControl
                                id="formControlsText"
                                type="text"
                                label="Text"
                                placeholder="Tag Name"
                                onChange={this.handleNameChange}
                            />
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={4}>
                            <Button onClick={this.addTag} type="submit">Add</Button>
                        </Col>
                    </Row>
                </form>
            </Grid >
        );
    }
}

export default ManageTags;