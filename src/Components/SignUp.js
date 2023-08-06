import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { auth, db } from "../Config/Config";
import FileBase64 from "react-file-base64";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Col from "react-bootstrap/Col";

function SingUp() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
    fileUpload: "",
    city: "",
    state: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((use) => {
          const userId = use.user.uid;
          setDoc(doc(db, "userDetails", userId), {
            id: userId,
            ...form,
          });
          alert("form fields added successfully");
          navigate("/logIn");
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign_up">
      <h1 className="pb-4 text-center text-decoration-underline">
        SignUp Page
      </h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            placeholder="Enter Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="userName"
            value={form.userName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter user mobile number"
            name="mobileNumber"
            value={form.number}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <FileBase64
            type="file"
            name="fileUpload"
            value={form.fileUpload}
            onDone={({ base64 }) =>
              setForm((prevVal) => {
                return { ...prevVal, fileUpload: base64 };
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            name="state"
            value={form.state}
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
        <div className="submit_btn text-center ">
          <Link to="/login">
            <Button
              className="mt-3 "
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              SignUp
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default SingUp;
