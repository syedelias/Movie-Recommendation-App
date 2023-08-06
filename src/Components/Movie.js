import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Movie = () => {
  const [movie, setMovie] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const searching = async () => {
      await fetch(`http://www.omdbapi.com/?s=${searchMovie}&apikey=c63d905b`)
        .then((res) => res.json())
        .then((data) => setMovie(data.Search));
    };
    searching();
  }, [searchMovie]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchMovie(movieName.toLowerCase());
  };

  const getMovieDetails = (imdbID) => {
    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=c63d905b`)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
        setShowModal(true);
      });
  };

  return (
    <div>
      <div className="search_bar">
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search any movie name"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setMovieName(e.target.value)}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </div>
      <div className="movie_page d-flex flex-wrap">
        {movie ? (
          movie.map((view) => {
            return (
              <div className="cards w-25" key={view.imdbID}>
                <Card className="m-3 p-3 movie-tag" style={{ width: "15rem" }}>
                  <Card.Img variant="top" src={view.Poster} alt="img" />
                  <Card.Body>
                    <Card.Title>{view.Title}</Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => getMovieDetails(view.imdbID)}
                    >
                      Movie
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        ) : (
          <p className="result text-light ">No results found</p>
        )}
      </div>
      {movieDetails && (
        <div>
          <div className="movie_details">
            <h2>{movieDetails.Title}</h2>
            <p>{movieDetails.Actors}</p>
            <p>{movieDetails.Plot}</p>
            <p>{movieDetails.Language}</p>
            <p>{movieDetails.Writer}</p>
            <p>{movieDetails.Director}</p>
            <p>{movieDetails.Country}</p>
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{movieDetails.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{movieDetails.Plot}</p>
              <p>Actors: {movieDetails.Actors}</p>
              <p>Language: {movieDetails.Language}</p>
              <p>Writer: {movieDetails.Writer}</p>
              <p>Director: {movieDetails.Director}</p>
              <p>Country: {movieDetails.Country}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Movie;
