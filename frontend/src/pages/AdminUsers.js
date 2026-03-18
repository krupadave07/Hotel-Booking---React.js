import { useEffect, useState } from "react";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));

  }, []);

  return (

    <div className="container-fluid p-4">

      <h3 className="fw-bold mb-4">👤 Users</h3>

      <div className="table-responsive">

        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
            </tr>

          </thead>

          <tbody>

            {users.length > 0 ? (

              users.map((user) => (

                <tr key={user.id}>

                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="3" className="text-center">
                  No users found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminUsers;