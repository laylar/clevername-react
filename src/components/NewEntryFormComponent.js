import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEntry } from "../redux/ActionCreators";
import { fetchEntries } from "../redux/ActionCreators";
import { Form, FormGroup, Button, Col, Input } from "reactstrap";

const mapDispatchToProps = {
  addEntry: (day, text) => addEntry(day, text),
  fetchEntries: () => fetchEntries(),
};

const mapStateToProps = (state) => ({
  entries: state.entries,
});

class NewEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  handleSubmit() {
    this.props.addEntry(this.props.dateLong, this.state.text);
    this.props.fetchEntries();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Col md={8} className="centered form-text">
            <Input
              type="textarea"
              id="text"
              name="text"
              value={this.state.text}
              placeholder={`What would you like to remember about ${this.props.dateLong}?`}
              rows="4"
              onChange={this.handleInputChange}
              maxLength="1000"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  this.handleSubmit();
                  this.setState({ text: "" });
                }
              }}
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewEntryForm)
);
