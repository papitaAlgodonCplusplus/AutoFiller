import StatCard from "./StatCard";

// Dashboard Component
const Dashboard = () => {
  const stats = {
    pendingLetters: 5,
    approvedLetters: 12,
    rejectedLetters: 3,
    totalLetters: 20
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Pending Letters" value={stats.pendingLetters} color="bg-yellow-100" />
        <StatCard title="Approved Letters" value={stats.approvedLetters} color="bg-green-100" />
        <StatCard title="Rejected Letters" value={stats.rejectedLetters} color="bg-red-100" />
        <StatCard title="Total Letters" value={stats.totalLetters} color="bg-blue-100" />
      </div>
    </div>
  );
};

export default Dashboard;