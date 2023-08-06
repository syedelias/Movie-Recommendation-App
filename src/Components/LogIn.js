import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../Config/Config";
import { signInWithEmailAndPassword } from "firebase/auth";

let LogIn = () => {
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    // async keyword added
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, detail.email, detail.password)
        .then((UserCredential) => {
          const id = UserCredential.user.uid;
          alert("User login successfully");
          navigate(`/review/${id}`);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="login_page">
      <h1 className="head pb-3 text-center text-decoration-underline">LogIn</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            value={detail.email}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={detail.password}
            onChange={handleChange}
          />
        </FloatingLabel>

        <Form.Group className="mt-3 text-center" controlId="formBasicButton">
          <Button variant="primary" type="submit">
            LogIn
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LogIn;
