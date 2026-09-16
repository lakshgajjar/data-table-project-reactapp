import { Badge, Button, Table } from "react-bootstrap";

function UserTable({ users, onDelete, onEdit }) {
  return (
    <section className="table-card">
      <div className="table-heading">
        <div>
          <h3>User Records</h3>
          <p>All registered users are shown here</p>
        </div>
        <span className="record-count">{users.length} Records</span>
      </div>

      <div className="table-scroll">
        <Table responsive hover className="user-table align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>City</th>
              <th>Skills</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="9" className="empty-row">
                  No Records Found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="id-cell">{user.id}</td>
                  <td className="name-cell">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td>{user.city}</td>
                  <td>
                    <div className="skill-list">
                      {user.skills.map((skill) => (
                        <Badge key={skill} className="skill-badge">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Button
                        size="sm"
                        className="edit-btn"
                        onClick={() => onEdit(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="delete-btn"
                        onClick={() => onDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </section>
  );
}

export default UserTable;
