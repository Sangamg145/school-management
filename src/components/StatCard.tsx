type Props = {
  label: string;
  value: string | number;
  icon?: string;
  bgColor?: string;
};

export default function StatCard({ label, value, icon, bgColor = "bg-gradient-to-br from-blue-500 to-blue-600" }: Props) {
  return (
    <div className={`${bgColor} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-blue-100 text-sm font-medium">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        {icon && <span className="text-4xl opacity-80">{icon}</span>}
      </div>
    </div>
  );
}

