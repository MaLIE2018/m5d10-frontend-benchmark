import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Component } from "react";

class AddComment extends Component {
  state = {
    newComment: {
      comment: "",
      rate: 1,
      imdbID: this.props.imdbid,
      author: "",
    },
  };

  handleNewCommentSubmit = () => {
    this.props.onNewCommentSubmit(true);
  };

  manipulateData = async (event) => {
    event.preventDefault();
    try {
      const api = process.env.REACT_APP_BE_URL;
      let response = await fetch(`${api}/comments/${this.props.imdbid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.newComment),
      });
      if (response.ok) {
        this.setState({ comment: "" });
        this.handleNewCommentSubmit();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  handleChange = (e) => {
    let id = e.target.id;
    this.setState((state) => {
      return {
        newComment: {
          ...this.state.newComment,
          [id]: parseInt(e.target.value)
            ? parseInt(e.target.value)
            : e.target.value,
        },
      };
    });
  };

  render() {
    return (
      <>
        <h6 className='mt-3'>Add Comments</h6>
        {this.props.newComment ? (
          <Alert variant='success'>Your Comment got saved!</Alert>
        ) : null}
        <Form onSubmit={this.manipulateData}>
          <Row>
            <Col>
              <Form.Group controlId='author'>
                <Form.Label className='sr-only'>Your comment</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={1}
                  value={this.state.newComment.author}
                  onChange={this.handleChange}
                  required
                  className='bg-dark text-white'
                  placeholder='Your Name'
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='comment'>
                <Form.Label className='sr-only'>Your comment</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={1}
                  value={this.state.newComment.comment}
                  onChange={this.handleChange}
                  required
                  className='bg-dark text-white'
                  placeholder='Your comment'
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='rate' className=''>
                <Form.Label className='sr-only'>Rating</Form.Label>
                <Form.Control
                  as='select'
                  onChange={this.handleChange}
                  required
                  className='bg-dark text-white'>
                  <option selected>Select your Rating</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default AddComment;
