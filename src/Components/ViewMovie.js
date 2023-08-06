import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Modal from "react-bootstrap/Modal";
import { Link, useParams } from "react-router-dom";
import Movie from "./Movie";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/Config";

const ViewMovie = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);
  const params = useParams();

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
  };

  const handleShow = () => {
    setShow(true);
    setEditMode(false);
    setEditedUserData(userData); // Initialize editedUserData with current userData
  };

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(db, "userDetails", params.id);
      const docSnap = await getDoc(userRef);
      setUserData(docSnap.data());
    };
    getUser();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "userDetails", params.id), editedUserData).then(
        (user) => {
          setUserData(editedUserData);
          alert("details update successfully!!");
          handleClose();
        }
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <div className="buttons">
        <Button
          className="mx-3 float-end "
          variant="success"
          onClick={handleShow}
        >
          User Profile
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="text-center" closeButton>
            <Modal.Title>User Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="profile-img text-center">
                <img
                  src={(editMode ? editedUserData : userData)?.fileUpload || ""}
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  value={(editMode ? editedUserData : userData)?.userName || ""}
                  name="userName"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                  value={(editMode ? editedUserData : userData)?.email || ""}
                  name="email"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={(editMode ? editedUserData : userData)?.password || ""}
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              {editMode && (
                <>
                  <Form.Group className="mb-3" controlId="formBasicNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter user mobile number"
                      value={editedUserData?.mobileNumber || ""}
                      name="mobileNumber"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      value={editedUserData?.city || ""}
                      name="city"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      defaultValue="Choose..."
                      value={editedUserData?.state || ""}
                      name="state"
                      onChange={handleChange}
                    >
                      <option>Choose...</option>
                      <option value="AP">Andhra Pradesh</option>
                      <option value="KA">Karnataka</option>
                      <option value="TN">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="MH">Maharashtra</option>
                    </Form.Select>
                  </Form.Group>
                </>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {editMode ? (
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button variant="outline-success" onClick={handleEdit}>
                Edit
              </Button>
            )}
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Link to="/">
          <Button className="float-end " variant="outline-danger" type="submit">
            LogOut
          </Button>
        </Link>
      </div>
      <div className="movies">
        <Movie />
      </div>
    </div>
  );
};

export default ViewMovie;
