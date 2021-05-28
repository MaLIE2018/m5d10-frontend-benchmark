import React, { useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import "../styles/css/Carousel.css";
import MovieCard from "../components/MovieCard";
import { sortByYear } from "../lib/helper";

function MovieCarousel(props) {
  const [index, setIndex] = useState(0);
  const [failedImages, addFailedImage] = useState([]);

  const handleFailedImage = (failedImage) => {
    addFailedImage(() => [...failedImages, failedImage]);
  };
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const chunkMovies = () => {
    const movies = sortByYear(props.carouselSaga.Search);

    let chunks = [];
    let i = 0;
    while (i < movies.length) {
      chunks.push(movies.slice(i, (i += 6)));
    }
    return chunks;
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className='mt-3'>
      {chunkMovies().map((chunk) => {
        return (
          <Carousel.Item>
            <Row className='flex-row'>
              {chunk.map((movie) => (
                <Col md={2}>
                  <MovieCard
                    onFailedImage={handleFailedImage}
                    movie={movie}
                    key={movie.imdbID}
                    keyValue={movie.imdbID}
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default MovieCarousel;
