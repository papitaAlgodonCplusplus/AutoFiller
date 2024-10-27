
// Admin Component
const Admin = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">User Management</h3>
          {/* Add user management interface here */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Approval Hierarchies</h3>
          {/* Add hierarchy management interface here */}
        </div>
      </div>
    </div>
  );
};

export default Admin;