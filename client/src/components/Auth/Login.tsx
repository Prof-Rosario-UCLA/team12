import React from 'react';

const Login: React.FC = () => {
  // TODO: Implement CSRF token handling
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login; 