import React, { Component } from "react";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import "../styles/css/Comments.css";
import { Row, Col, Spinner } from "react-bootstrap";

class Comments extends Component {
  state = {
    comments: {},
    isLoading: true,
    newComment: false,
  };

  handleNewCommentSubmit = (newComment) => {
    this.setState({ newComment: newComment });
  };

  componentDidUpdate = async () => {
    if (this.state.newComment === true) {
      await this.componentDidMount();
    }
  };

  componentDidMount = async () => {
    try {
      const api = process.env.REACT_APP_BE_URL;
      let response = await fetch(
        `${api}/comments/${this.props.selectedMovie.imdbID}`
      );
      if (response.ok) {
        let data = await response.json();

        this.setState((state) => {
          return { comments: data, isLoading: false, newComment: false };
        });
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      alert("something went wrong");
    }
  };

  render() {
    const spinner = (
      <Spinner animation='border' role='status' className='mt-5'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    );
    return (
      <div className='commentArea'>
        <Row className='m-3'>
          <Col sm={7} md={10} lg={10}>
            <h4>{this.props.selectedMovie.title}</h4>
            {this.state.isLoading ? (
              spinner
            ) : (
              <CommentList
                comments={this.state.comments}
                style={{ zIndex: 1 }}
              />
            )}
            <Row className=''>
              <Col>
                <AddComment
                  newComment={this.state.newComment}
                  imdbid={this.props.selectedMovie.imdbID}
                  onNewCommentSubmit={this.handleNewCommentSubmit}
                  style={{ zIndex: 1 }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Comments;
