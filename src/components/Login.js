import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/landing");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            Alert(errorCode)
          });

    }
    catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <br />
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
      </>
  );
}
