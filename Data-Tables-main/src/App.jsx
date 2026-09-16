import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import SearchSort from "./components/SearchSort";
import PaginationBlock from "./components/PaginationBlock";

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  useEffect(() => {
    const data = localStorage.getItem("users");

    if (data) {
      setUsers(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const saveUser = (user) => {
    if (editUser) {
      const updatedUsers = users.map((item) => {
        if (item.id === editUser.id) {
          return { ...user, id: editUser.id };
        }
        return item;
      });

      setUsers(updatedUsers);
      setEditUser(null);
      return;
    }

    const newUser = {
      ...user,
      id: Date.now(),
    };

    setUsers([...users, newUser]);
  };

  const deleteUser = (id) => {
    const confirmDelete = window.confirm("Do you want to delete this record?");

    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const editRecord = (user) => {
    setEditUser(user);
  };

  let filteredUsers = users.filter((user) => {
    const text = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(text) ||
      user.email.toLowerCase().includes(text) ||
      user.phone.includes(text) ||
      user.gender.toLowerCase().includes(text) ||
      user.city.toLowerCase().includes(text)
    );
  });

  if (sort) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      if (a[sort] < b[sort]) return -1;
      if (a[sort] > b[sort]) return 1;
      return 0;
    });
  }

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const pageUsers = filteredUsers.slice(firstIndex, lastIndex);

  return (
    <>
      <Navbar className="top-navbar">
        <Container>
          <Navbar.Brand className="brand-title">
            User Management
          </Navbar.Brand>
        </Container>
      </Navbar>

      <main className="page-area">
        <Container>
          <UserForm
            onSave={saveUser}
            editUser={editUser}
            onCancel={() => setEditUser(null)}
          />

          <SearchSort
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
            setCurrentPage={setCurrentPage}
          />

          <UserTable
            users={pageUsers}
            onDelete={deleteUser}
            onEdit={editRecord}
          />

          <PaginationBlock
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </Container>
      </main>
    </>
  );
}

export default App;
