import React, { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { withRouter } from "react-router";

class NewMovie extends Component {
  state = {
    movie: {
      Title: "",
      Poster: "",
      Year: 2000,
      Type: "",
      imdbID: "",
    },
    poster: undefined,
  };

  handleChange(e) {
    e.preventDefault();
    this.setState((state) => {
      return {
        movie: {
          ...state.movie,
          [e.target.id]: e.target.value,
        },
      };
    });
  }

  handleFileUpload(e) {
    const formData = new FormData();
    formData.append("cover", e.target.value);
    this.setState((state) => {
      return { poster: formData };
    });
  }
  uploadFile = async (id) => {
    const api = process.env.REACT_APP_BE_URL;
    try {
      const res = await fetch(`${api}/movies/${id}/upload`, {
        method: "POST",
        body: this.state.poster,
      });
      if (!res.ok) throw new Error(res.status);
    } catch (error) {
      console.log(error);
    }
  };

  postMovie = async (e) => {
    e.preventDefault();
    try {
      const api = process.env.REACT_APP_BE_URL;
      const res = await fetch(`${api}/movies/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.movie),
      });
      if (!res.ok) throw new Error(res.status);
      if (this.state.poster) {
        const data = await res.json();
        await this.uploadFile(data.imdbID);
      }
      alert("movie added!");
      this.props.history.push("/movies");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Row className='mb-5 ml-2'>
        <Col md={6} className='mx-auto'>
          <Form>
            <Form.Group controlId='imdbID'>
              <Form.Label>imdbID</Form.Label>
              <Form.Control
                type='text'
                placeholder='imdbID'
                onChange={(e) => this.handleChange(e)}
                value={this.state.movie.imdbID}
              />
            </Form.Group>
            <Form.Group controlId='Title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Title'
                onChange={(e) => this.handleChange(e)}
                value={this.state.movie.Title}
              />
            </Form.Group>
            <Form.Group controlId='Type'>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type='text'
                placeholder='Type'
                onChange={(e) => this.handleChange(e)}
                value={this.state.movie.Type}
              />
            </Form.Group>
            <Form.Group controlId='Poster'>
              <Form.Label>Poster</Form.Label>
              <Form.Control
                type='text'
                placeholder='Poster'
                onChange={(e) => this.handleChange(e)}
                value={this.state.movie.Poster}
              />
            </Form.Group>
            <Form>
              <Form.Group>
                <Form.File
                  id='cover'
                  label='Select a cover'
                  onChange={(e) => this.handleFileUpload(e)}
                />
              </Form.Group>
            </Form>
            <Form.Group controlId='Year'>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type='number'
                placeholder='Year'
                onChange={(e) => this.handleChange(e)}
                value={this.state.movie.Year}
                max='2030'
              />
            </Form.Group>
            <Button
              className='float-right'
              variant='primary'
              type='submit'
              onClick={(e) => this.postMovie(e)}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default withRouter(NewMovie);
