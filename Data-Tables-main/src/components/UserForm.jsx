import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  gender: "",
  city: "",
  skills: [],
  terms: false,
};

function UserForm({ onSave, editUser, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    } else {
      setFormData(emptyForm);
    }
  }, [editUser]);

  const changeValue = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const changeSkill = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        skills: [...formData.skills, value],
      });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter((skill) => skill !== value),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";

    if (!editUser && !formData.password) {
      newErrors.password = "Password is required";
    } else if (!editUser && formData.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must contain exactly 10 digits";
    }

    if (!formData.gender) newErrors.gender = "Select gender";
    if (!formData.city) newErrors.city = "Select city";
    if (formData.skills.length === 0) {
      newErrors.skills = "Select at least one skill";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSave(formData);
    setFormData(emptyForm);
    setErrors({});
  };

  const errorMessage = (message) =>
    message ? (
      <Alert variant="danger" className="form-error">
        {message}
      </Alert>
    ) : null;

  return (
    <Card className="form-card">
      <div className="section-heading">
        <span className="section-icon">+</span>
        <div>
          <h3>{editUser ? "Update User" : "Add New User"}</h3>
          <p>Enter the user details below</p>
        </div>
      </div>

      <Form onSubmit={submitForm}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={changeValue}
                placeholder="Enter full name"
              />
              {errorMessage(errors.name)}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={changeValue}
                placeholder="Enter email address"
              />
              {errorMessage(errors.email)}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={changeValue}
                placeholder="Enter password"
              />
              {errorMessage(errors.password)}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={formData.phone}
                onChange={changeValue}
                placeholder="10 digit phone number"
              />
              {errorMessage(errors.phone)}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <div className="option-box">
            {["Male", "Female", "Other"].map((gender) => (
              <Form.Check
                inline
                key={gender}
                type="radio"
                label={gender}
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={changeValue}
              />
            ))}
          </div>
          {errorMessage(errors.gender)}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Select
            name="city"
            value={formData.city}
            onChange={changeValue}
          >
            <option value="">Select City</option>
            <option value="Surat">Surat</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Vadodara">Vadodara</option>
            <option value="Rajkot">Rajkot</option>
          </Form.Select>
          {errorMessage(errors.city)}
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Skills</Form.Label>
          <div className="option-box">
            {["HTML", "CSS", "JavaScript", "React"].map((skill) => (
              <Form.Check
                inline
                key={skill}
                type="checkbox"
                label={skill}
                value={skill}
                checked={formData.skills.includes(skill)}
                onChange={changeSkill}
              />
            ))}
          </div>
          {errorMessage(errors.skills)}
        </Form.Group>

        <div className="form-actions">
          <Button type="submit" className="save-btn">
            {editUser ? "Update User" : "Add User"}
          </Button>

          {editUser && (
            <Button variant="outline-secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
}

export default UserForm;
