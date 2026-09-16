import { Col, Form, Row } from "react-bootstrap";

function SearchSort({ search, setSearch, sort, setSort, setCurrentPage }) {
  const searchUser = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const sortUser = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="search-card">
      <div className="search-title">
        <div>
          <h3>Find Users</h3>
          <p>Search records or arrange them by field</p>
        </div>
      </div>

      <Row>
        <Col md={7}>
          <Form.Group>
            <Form.Label>Search Users</Form.Label>
            <Form.Control
              value={search}
              onChange={searchUser}
              placeholder="Search name, email, phone, city..."
            />
          </Form.Group>
        </Col>

        <Col md={5}>
          <Form.Group>
            <Form.Label>Sort Records</Form.Label>
            <Form.Select value={sort} onChange={sortUser}>
              <option value="">Default order</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="gender">Gender</option>
              <option value="city">City</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </section>
  );
}

export default SearchSort;
