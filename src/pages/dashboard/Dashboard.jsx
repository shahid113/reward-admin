import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [liveUsers, setLiveUsers] = React.useState([
    { name: "John Doe", time: "2 mins ago" },
    { name: "Jane Smith", time: "5 mins ago" },
  ]);
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to the Admin Dashboard
      </h1>
  
      <div className="mb-6">
        <p className="text-gray-700">
          {user ? `Logged in as: ${user.email}` : 'User Profile'}
        </p>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Users</h2>
          <p>Manage system users</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p>View system statistics</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Settings</h2>
          <p>Configure system settings</p>
        </div>
      </div>
  
      {/* Live User Onboard Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Live User Onboard</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          {liveUsers && liveUsers.length > 0 ? (
            <ul className="space-y-2">
              {liveUsers.map((liveUser, index) => (
                <li
                  key={index}
                  className="bg-white shadow p-4 rounded-lg flex justify-between items-center"
                >
                  <span className="font-semibold">{liveUser.name}</span>
                  <span className="text-gray-500">{liveUser.time}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No users are onboarding right now.</p>
          )}
        </div>
      </div>
  
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </div>
  
  );
};

export default Dashboard;