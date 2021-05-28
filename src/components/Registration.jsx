import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { nanoid } from "nanoid";
import { withRouter } from "react-router";
import { useEasybase } from "easybase-react";

function Registration(props) {
  const { db } = useEasybase();
  const [inputs, setInput] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    address: "",
    city: "",
    zip: "",
    date: new Date(1909, 1, 17),
    id: nanoid(),
  });
  const [formValid, setFormValid] = useState(false);

  const saveUser = async () => {
    try {
      await db("NEWUSERS").insert({ inputs }).one();
      // Frame().push(inputs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    console.log(inputs);
    setInput(() => {
      return { ...inputs, [e.target.id]: e.target.value };
    });
  };

  useEffect(() => {
    checkForm();
  }, [inputs]);

  // useEffect(() => {
  //   configureFrame({ tableName: "NEWUSERS", limit: 10 });
  //   sync();
  // }, []);

  const checkForm = () => {
    const check = [
      ...document
        .querySelector(".registrationForm")
        .querySelectorAll(".form-control"),
    ].every((element) => {
      return element.classList.contains("is-valid");
    });
    if (check) {
      setFormValid({ formValid: true });
    }
  };

  const submitForm = () => {
    saveUser();
    props.history.push(`/Register/${inputs.id}`);
  };

  return (
    <Row className='mb-5 ml-2'>
      <Col md={6} className='mx-auto'>
        <h3>Register NOW with the ridiculous long form</h3>
        <Form onSubmit={(e) => e.preventDefault()} className='registrationForm'>
          <Form.Row>
            <Form.Group as={Col} controlId='firstname'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='First name'
                required
                value={inputs.firstname}
                className={
                  inputs.firstname.length >= 2 ? "is-valid" : "is-invalid"
                }
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='surname'>
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type='text'
                placeholder='Surname'
                required
                value={inputs.surname}
                className={
                  inputs.surname.length >= 3 ? "is-valid" : "is-invalid"
                }
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                required
                value={inputs.email}
                className={
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    inputs.email
                  )
                    ? "is-valid"
                    : "is-invalid"
                }
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                required
                value={inputs.password}
                className={
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}$/.test(inputs.password)
                    ? "is-valid"
                    : "is-invalid"
                }
                onChange={(e) => handleChange(e)}
              />
              <Form.Text className='text-muted'>
                Should contain at least 8 chars, 1 digit, 1 letter.
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId='date'>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type='date'
              required
              value={inputs.date}
              className={
                new Date(inputs.date).getFullYear() >= 1910
                  ? "is-valid"
                  : "is-invalid"
              }
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder='1234 Main St'
              required
              value={inputs.address}
              className={inputs.address.length >= 2 ? "is-valid" : "is-invalid"}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder='Berlin'
                required
                value={inputs.city}
                className={inputs.city.length >= 3 ? "is-valid" : "is-invalid"}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='zip'>
              <Form.Label>Zip</Form.Label>
              <Form.Control
                placeholder='12443'
                required
                type='number'
                value={inputs.zip}
                className={inputs.zip.length === 5 ? "is-valid" : "is-invalid"}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Form.Row>
          <Button
            type='submit'
            style={{ backgroundColor: "#E50914", border: "none" }}
            disabled={formValid ? false : true}
            onClick={() => submitForm()}>
            Sign up
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default withRouter(Registration);
