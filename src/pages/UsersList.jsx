import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLetter, setFilterLetter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [page, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://reqres.in/api/users", { params: { page } });
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setFilteredUsers(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = users;
    if (searchQuery) {
      filtered = filtered.filter((user) =>
        `${user.first_name} ${user.last_name} ${user.email}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    if (filterLetter) {
      filtered = filtered.filter((user) => user.first_name.startsWith(filterLetter));
    }
    setFilteredUsers(filtered);
  }, [searchQuery, filterLetter, users]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      toast.success("User deleted successfully!");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      toast.error("Failed to delete user.");
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://reqres.in/api/users/${editingUser.id}`, editingUser);
      toast.success("User updated successfully!");
      setUsers((prev) =>
        prev.map((user) => (user.id === editingUser.id ? { ...user, ...response.data } : user))
      );
      setEditingUser(null);
    } catch (error) {
      toast.error("Failed to update user.");
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-200 p-4">
      <h2 className="text-2xl font-bold mb-4">Features & Users List</h2> 

        <div className=" flex space-x-2 justify-center items-center p-4 bg-gray-700 rounded-2xl mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 bg-gray-300 rounded-2xl w-1/2"
          />
          <select
            className="px-3 py-2 bg-gray-300 rounded-2xl w-1/2"
            value={filterLetter}
            onChange={(e) => setFilterLetter(e.target.value)}
          >
            <option value="">Filter by First Letter</option>
            {Array.from(new Set(users.map((u) => u.first_name[0]))).sort().map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <>
            <div className="w-2/3 overflow-x-auto">
            <table className="border-collapse w-full min-w-max rounded-2xl bg-gray-300 shadow-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-2">Avatar</th>
                  <th className="p-2">First Name</th>
                  <th className="p-2">Last Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="text-center hover:bg-gray-200 transition">
                    <td className="p-2">
                      <img src={user.avatar} alt={user.first_name} className="w-12 h-12 rounded-full mx-auto" />
                    </td>
                    <td className="p-2">{user.first_name}</td>
                    <td className="p-2">{user.last_name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">
                      <button onClick={() => handleEdit(user)} className="bg-yellow-500 px-2 py-1 text-white rounded mr-2 hover:cursor-pointer">Edit</button>
                      <button onClick={() => handleDelete(user.id)} className="bg-red-500 px-2 py-1 text-white rounded hover:cursor-pointer">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            <div className="mt-4 flex justify-center items-center space-x-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="bg-blue-500 text-white px-3 py-2 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <div className="flex justify-center items-center">
              <span>{page}/{totalPages}</span>
              </div>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="bg-blue-500 text-white px-3 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
            {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Edit User</h3>
              <form onSubmit={handleUpdateUser}>
                <input
                  type="text"
                  value={editingUser.first_name}
                  onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
                  className="w-full p-2 border border-gray-400 rounded mb-2"
                />
                <input
                  type="text"
                  value={editingUser.last_name}
                  onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
                  className="w-full p-2 border border-gray-400 rounded mb-2"
                />
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full p-2 border border-gray-400 rounded mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Update
                </button>
                <button onClick={() => setEditingUser(null)} className="ml-2 text-gray-600">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </>
  );
}
