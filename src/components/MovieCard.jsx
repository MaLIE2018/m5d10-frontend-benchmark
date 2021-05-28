import { Card, Spinner } from "react-bootstrap";
import React from "react";
import { withRouter } from "react-router";
import { NuclearOutline } from "react-ionicons";

class MovieCard extends React.Component {
  state = {
    isLoaded: false,
    showContext: false,
  };

  handleImageLoaded() {
    this.setState({ isLoaded: true });
  }

  handleMouseEnter = () => {
    this.setState((state) => {
      return { showContext: true };
    });
  };
  handleMouseOut = () => {
    this.setState((state) => {
      return { showContext: false };
    });
  };

  render() {
    return (
      <>
        <Card
          style={{ border: "none", backgroundColor: "transparent" }}
          onMouseEnter={this.handleMouseEnter}
          onMouseOut={this.handleMouseOut}
          className='movie-card'>
          <Card.Img
            onClick={() =>
              this.props.history.push(`/Details/${this.props.keyValue}`)
            }
            variant='top'
            src={this.props.movie.Poster}
            style={{ width: 150 }}
            onLoad={this.handleImageLoaded.bind(this)}
            onError={() => this.props.onFailedImage(this.props.keyValue)}
          />
          {this.state.showContext ? <Card.Body>Test</Card.Body> : null}
          {!this.state.isLoaded ? (
            <Spinner animation='border' variant='light' role='status'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          ) : null}
        </Card>
      </>
    );
  }
}

export default withRouter(MovieCard);
