// Stat Card Component
const StatCard = ({ title, value, color }) => {
  return (
    <div className={`${color} p-4 rounded shadow`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;