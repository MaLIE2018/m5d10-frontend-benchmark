import React, { Component } from "react";
import Comments from "./Comments";
import { Col, Row, Spinner } from "react-bootstrap";
import { AddOutline } from "react-ionicons";

class Details extends Component {
  state = {
    selectedMovie: {},
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=5660ed2b`
      );
      if (res.ok) {
        const data = await res.json();
        this.setState((state) => {
          return { selectedMovie: data };
        });
      } else {
        console.log("problem");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const movie = this.state.selectedMovie;
    return Object.keys(movie).length ? (
      <Row className='mb-5 ml-4 align-items-center' style={{ height: "" }}>
        <Col md={4} className='ml-auto'>
          <Row style={{ backgroundColor: "#333333" }}>
            <Col className='align-items-bottom d-flex flex-row pt-3'>
              <div
                className='AddToWatchListForm d-flex justify-content-center 
              align-items-center mt-1 mr-2'>
                <AddOutline
                  color={"#ffffff"}
                  className='text-bolder'
                  title={"Add to WatchList"}
                  height='25px'
                  width='25px'
                  style={{ transform: "translateY(-20%)" }}
                />
              </div>
              <div className=''>
                <h3 className=''>{movie.Title}</h3>
                <p className='text-muted' style={{ fontSize: "0.8rem" }}>
                  {movie.Runtime} | {movie.Genre} | {movie.Year}
                </p>
              </div>
            </Col>
            <Col className='p-3 d-flex align-items-center justify-content-end'>
              <div className='float-right d-flex flex-row'>
                <div className='ratingStar'></div>
                <p className='ml-2' style={{ fontSize: "1.2rem" }}>
                  {movie.imdbRating}{" "}
                  <span className='text-muted' style={{ fontSize: "0.6rem" }}>
                    /10
                  </span>{" "}
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={4} className='pl-0 pt-0'>
              <img src={movie.Poster} alt='' className='img-fluid' />
            </Col>
            <Col>
              <p className='py-4'>
                {movie.Plot ? movie.Plot : "Sorry, no Plot"}
              </p>
              <div className='row d-flex flex-row'>
                <Col md={2} className='d-flex flex-column font-weight-bold'>
                  <span>Director:</span>
                  <span>Writer:</span>
                  <span>Actors:</span>
                </Col>
                <Col className='d-flex flex-column'>
                  <span>
                    {movie.Director.split(",").map((item, i) => (
                      <>
                        <a href='#'>{item}</a>
                        {i === movie.Director.split(",").length - 1 ? "" : ", "}
                      </>
                    ))}
                  </span>
                  <span>
                    {movie.Writer.split(",").map((item, i) => (
                      <>
                        <a href='#'>{item}</a>
                        {i === movie.Writer.split(",").length - 1 ? "" : ", "}
                      </>
                    ))}
                  </span>
                  <span>
                    {movie.Actors.split(",").map((item, i) => (
                      <>
                        <a href='#'>{item}</a>
                        {i === movie.Actors.split(",").length - 1 ? "" : ", "}
                      </>
                    ))}
                  </span>
                </Col>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={4} className='mr-auto'>
          <Comments selectedMovie={movie} />
        </Col>
      </Row>
    ) : (
      <Row
        className='flex-column mb-5 ml-2 align-items-center'
        style={{ height: "80vh" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <Spinner animation='border' variant='light' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </Col>
      </Row>
    );
  }
}

export default Details;
