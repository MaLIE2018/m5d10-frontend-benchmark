import React, { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

class NewMovie extends Component {
  render() {
    return (
      <Row className='mb-5 ml-2'>
        <Col md={6} className='mx-auto'>
          <Form>
            <Form.Group controlId='imdbID'>
              <Form.Label>imdbID</Form.Label>
              <Form.Control type='text' placeholder='imdbID' />
            </Form.Group>
            <Form.Group controlId='Title'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' placeholder='Title' />
            </Form.Group>
            <Form.Group controlId='Type'>
              <Form.Label>Type</Form.Label>
              <Form.Control type='text' placeholder='Type' />
            </Form.Group>
            <Form.Group controlId='Poster'>
              <Form.Label>Poster</Form.Label>
              <Form.Control type='text' placeholder='Poster' />
            </Form.Group>
            <Form>
              <Form.Group>
                <Form.File id='cover' label='Select a cover' />
              </Form.Group>
            </Form>
            <Form.Group controlId='Cover'>
              <Form.Label>Cover</Form.Label>
              <Form.Control type='text' placeholder='Cover' />
            </Form.Group>
            <Form.Group controlId='Year'>
              <Form.Label>Year</Form.Label>
              <Form.Control type='number' placeholder='Year' />
            </Form.Group>
            <Button className='float-right' variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default NewMovie;
