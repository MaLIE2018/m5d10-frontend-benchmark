import { ListGroup, Button } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import { Component } from "react";

class CommentList extends Component {
  state = {
    filterText: "",
    hover: false,
  };

  handleFilterTextChange = (FilterText) => {
    this.setState({ filterText: FilterText, filteredComments: [] });
  };

  handleNewCommentSubmit = () => {
    this.props.onNewCommentSubmit(true);
  };

  manipulateData = async (event, id) => {
    event.preventDefault();
    try {
      const api = process.env.REACT_APP_BE_URL;
      let response = await fetch(`${api}/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.newComment),
      });
      if (response.ok) {
        this.handleNewCommentSubmit();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  render() {
    const filterText = this.state.filterText;
    let comments;
    // eslint-disable-next-line no-lone-blocks
    {
      if (filterText !== "") {
        let filteredComments = this.props.comments.filter(function (comment) {
          return (
            comment.comment.toLowerCase().includes(filterText.toLowerCase()) ||
            comment.author.toLowerCase().includes(filterText.toLowerCase())
          );
        });
        comments = filteredComments;
      } else {
        comments = this.props.comments;
      }
    }
    return this.props.comments.length !== 0 ? (
      <>
        <h2>Comments</h2>
        <div
          style={{
            height: "30vh",
            overflowY: "auto",
            backgroundColor: "black",
          }}>
          <SearchBar
            currentText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <ListGroup>
            {comments.map((comment) => {
              return (
                <ListGroup.Item key={comment._id} className='bg-dark'>
                  Author: {comment.author} Comment: {comment.comment} Rating:{" "}
                  {comment.rate}
                  <Button
                    className='btn btn-danger'
                    onClick={(e) => this.manipulateData(e, comment._id)}>
                    Del
                  </Button>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </>
    ) : (
      <h6>No Comments, add one!</h6>
    );
  }
}

export default CommentList;
