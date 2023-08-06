import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import img from "../images/img.png";
import poster from "../images/posterOne.jpg";
import poster1 from "../images/posterTwo.jpg";
import poster2 from "../images/posterThree.jpg";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-div">
      <div className="header">
        <Navbar
          expand="lg"
          className="bg-body-tertiary d-flex justify-content-space-between w-100"
        >
          <div>
            <Navbar.Brand href="#">
              <img src={img} style={{ height: "60px", width: "100px" }} />
            </Navbar.Brand>
          </div>
          <div className="ms-auto">
            <Navbar.Collapse className="w-25" id="navbarScroll">
              <Link to="/login">
                <Button variant="primary" type="submit">
                  LogIn
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="mx-3 " variant="primary" type="submit">
                  SignUp
                </Button>
              </Link>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
      <div className=" w-100 ">
        <Carousel data-bs-theme="dark" className="posters">
          <Carousel.Item>
            <img
              className="image d-block w-100"
              src={poster}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="image d-block w-100"
              src={poster1}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="image d-block w-100"
              src={poster2}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Header;
