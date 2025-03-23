'use client';

import { useState, useEffect } from 'react';

type Admin = {
  id: string;
  name: string;
};

export default function AdminManager() {
  const [name, setName] = useState('');
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admins');
      if (!response.ok) throw new Error('Failed to fetch admins');
      const data = await response.json();
      setAdmins(data);
      setError('');
    } catch (err) {
      setError('Error fetching admins');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  // Create a new admin
  const createAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const response = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error('Failed to create admin');
      
      await fetchAdmins();
      setName('');
      setError('');
    } catch (err) {
      setError('Error creating admin');
      console.error(err);
    }
  };

  // Update an admin
  const updateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !name.trim()) return;

    try {
      const response = await fetch(`/api/admins/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error('Failed to update admin');
      
      await fetchAdmins();
      setName('');
      setEditingId(null);
      setError('');
    } catch (err) {
      setError('Error updating admin');
      console.error(err);
    }
  };

  // Delete an admin
  const deleteAdmin = async (id: string) => {
    try {
      const response = await fetch(`/api/admins/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete admin');
      
      await fetchAdmins();
      if (editingId === id) {
        setEditingId(null);
        setName('');
      }
      setError('');
    } catch (err) {
      setError('Error deleting admin');
      console.error(err);
    }
  };

  // Set up editing
  const startEditing = (admin: Admin) => {
    setEditingId(admin.id);
    setName(admin.name);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setName('');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-black text-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Admin Manager</h1>
      
      {error && <div className="mb-4 p-2 bg-red-900 text-white rounded">{error}</div>}
      
      <form onSubmit={editingId ? updateAdmin : createAdmin} className="mb-6">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="flex-grow px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEditing}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <div className="border-t border-gray-700 pt-4">
        <h2 className="text-xl font-semibold mb-2">Admin List</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : admins.length === 0 ? (
          <p className="text-gray-400">No admins found</p>
        ) : (
          <ul className="space-y-2">
            {admins.map((admin) => (
              <li key={admin.id} className="flex items-center justify-between p-2 border border-gray-700 rounded">
                <span>{admin.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(admin)}
                    className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAdmin(admin.id)}
                    className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 