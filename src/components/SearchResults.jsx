import MoviePageHeader from "../components/MoviePageHeader";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import { sortByYear } from "../lib/helper";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

const SearchResults = (props) => {
  const [movies, setMovies] = useState([]);
  const [failedImages, addFailedImage] = useState([]);
  const [error, setError] = useState("");

  const handleFailedImage = (failedImage) => {
    addFailedImage(() => [...failedImages, failedImage]);
  };

  const fetchData = async () => {
    const query =
      props.randomSearch !== undefined
        ? props.randomSearch
        : props.match.params.query;
    const series = props.randomSearch !== undefined ? "&type=series" : "";
    try {
      let response = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=5660ed2b${series}`,
        {
          method: "GET",
          header: {
            ContentType: "application/json",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        setMovies([data]);
      }
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [props.match.params.query]);

  return (
    <>
      <Row className='flex-column mb-5 ml-2'>
        <>
          <Col className='mb-5'>
            <MoviePageHeader moviePageHeadline={props.moviePageHeadline} />
          </Col>
          <Col className='mb-5'>
            <Row>
              {movies.length !== 0 && movies[0].Response === "True" ? (
                sortByYear(movies[0].Search).map((movie) => {
                  if (!failedImages.includes(movie.imdbID)) {
                    return (
                      <Col xs={12} md={2} className='mb-4'>
                        <MovieCard
                          onFailedImage={handleFailedImage}
                          movie={movie}
                          key={movie.imdbID}
                          keyValue={movie.imdbID}
                          onShowCommentsClick={props.onShowCommentsClick}
                        />
                      </Col>
                    );
                  }
                })
              ) : (
                <Col>
                  <h2>{movies.length !== 0 && movies[0].Error}</h2>
                </Col>
              )}
            </Row>
          </Col>
        </>
      </Row>
    </>
  );
};

export default withRouter(SearchResults);
