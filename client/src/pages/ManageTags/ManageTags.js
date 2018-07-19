import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Label } from 'react-bootstrap';
import API from "../../utils/API";
import defaultTags from '../../utils/defaultTags';
import Tag from '../../components/Tag';
import './ManageTags.css';
import NavBar from '../../components/NavBar';
import cssColors from '../../utils/cssColors';


class ManageTags extends Component {

    state = {
        userId: null,
        userTags: [],
        defaultTags: defaultTags,
        // availableTags: [],
        tagName: "",
        txtColor: "",
        color: "",
    }


    componentWillMount() {

        const user = JSON.parse(sessionStorage.user);
        this.setState({ userId: user.id }, () => {
            this.getUserTags();
        });
    }

    getUserTags = () => {
        API.getUserTags(this.state.userId)
            .then((res) => {
                this.setState({ userTags: res.data })
                // this.setState({ availableTags: defaultTags.concat(res.data) });
                console.log("user tags " + JSON.stringify(this.state.userTags));
                // console.log("Available Tags: " + JSON.stringify(this.state.availableTags));
                console.log("default tags " + JSON.stringify(this.state.defaultTags));
            })
            .catch(err => console.log(err));
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
                this.getUserTags();
            })
            .catch(err => console.log(err));
    }

    deleteTag = (e) => {
        console.log(e.target.id);
        API.deleteTag(e.target.id)
            .then((res) => {
                console.log(res);
                this.getUserTags();
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <div id="manage-tags-page-wrapper">
                <NavBar />
                <Grid>
                    <Row>
                        <Col id="manage-tags-wrapper" xs={12} md={8} mdOffset={2}>
                        <Row>
                            <Col xs={12}>
                            <div className="manage-tag-list">
                                {this.state.defaultTags.map((tag, i) => (
                                    <h4 className="tag-container" key={i}><Tag id={tag.id} name={tag.name} color={tag.color} txtColor={tag.txtColor} key={i} onClick={this.handleTagClick} /></h4>
                                ))}
                                {this.state.userTags.map((tag, i) => (
                                    <h4 className="tag-container" key={i}><Tag id={tag.id} name={tag.name} color={tag.color} txtColor={tag.txtColor} key={i} onClick={this.handleTagClick} /><Button onClick={this.deleteTag} id={tag.id} bsStyle='danger' bsSize="xsmall">X</Button> </h4>
                                ))}
                            </div>
                            <hr />
                        </Col>
                    </Row>
                    <form>
                        <Row>
                            <Col xs={12}>
                        <Row>
                            <Col xs={12} md={6}>
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>Color</ControlLabel>
                                    <FormControl componentClass="select" placeholder="select" onChange={this.handleColorChange}>
                                        <option value="select">select</option>
                                        {cssColors.map((color, i) => (
                                            <option value={color} key={i}>{color}</option>
                                        ))
                                    }
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col xs={12} md={6}>
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>Text Color</ControlLabel>
                                    <FormControl componentClass="select" placeholder="select" onChange={this.handleTxtColorChange}>
                                    <option value="select">select</option>
                                        {cssColors.map((color, i) => (
                                            <option value={color} key={i}>{color}</option>
                                        ))
                                    }
                                    </FormControl>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6}>
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
                            <Col xs={6} md={3}>
                            <h4><Label className="tag" style={{ backgroundColor: this.state.color, color:this.state.txtColor }}>{this.state.tagName || "YourTag" }</Label></h4>
                            </Col>
                            <Col xs={6} md={3}>
                                <Button bsStyle='success' onClick={this.addTag} type="submit">Add</Button>
                            </Col>
                        </Row>
                        </Col>
                        </Row>
                    </form>
                    </Col>
                    </Row>
                </Grid >
            </div>
        );
    }
}

export default ManageTags;