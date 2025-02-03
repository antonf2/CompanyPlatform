import React, { useState, useEffect } from "react";
import useManagementLogic from "../Services/useManagementLogic";

export default function Management() {
  const {
    users,
    loading,
    error,
    currentUser,
    isPopupOpen,
    isEditing,
    handleEditClick,
    handleCreateClick,
    handleClosePopup,
    handleSave,
    handleDeleteClick,
    handleInputChange,
    handleCancel,
    isModalOpen,
    setIsModalOpen,
  } = useManagementLogic();

  const [idToDelete, setIdToDelete] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const handleDelete = (id) => {
    setIdToDelete(id);
    setIsModalOpen(true);
  };

  const paginatedUsers = users.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="container py-3 mx-auto">
        <h3 className="text-3xl font-medium text-gray-700">User Management</h3>

        <button
          onClick={handleCreateClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-3 mt-3 hover:bg-blue-600"
        >
          Create New User
        </button>

        <div className="flex flex-col mt-4">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Name
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Role
                    </th>
                    <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Email
                    </th>
                    <th className="px-4 py-3 border-b border-gray-200 bg-gray-50"></th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {paginatedUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                        {user.username}
                      </td>
                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                        {user.role}
                      </td>
                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                        {user.email}
                      </td>
                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200 text-right">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            &lt; Prev
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                (prev + 1) * itemsPerPage < users.length ? prev + 1 : prev
              )
            }
            disabled={(currentPage + 1) * itemsPerPage >= users.length}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Next &gt;
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit User" : "Create User"}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>
            {!isEditing && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={currentUser.password}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Active</label>
              <select
                name="isActive"
                value={currentUser.isActive}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                name="role"
                value={currentUser.role}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg max-w-[90%] sm:max-w-md mx-auto">
            <p className="text-lg font-semibold text-center">
              Are you sure you want to delete this item?
            </p>
            <div className="flex space-x-4 mt-4 justify-center">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleDeleteClick(idToDelete)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
