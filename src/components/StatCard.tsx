type Props = {
  label: string;
  value: string | number;
  icon?: string;
  bgColor?: string;
};

export default function StatCard({ label, value, icon, bgColor = "bg-gradient-to-br from-blue-500 to-blue-600" }: Props) {
  return (
    <div className={`${bgColor} text-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-blue-100 text-xs sm:text-sm font-medium truncate">{label}</p>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold">{value}</p>
        </div>
        {icon && <span className="text-2xl sm:text-3xl md:text-4xl opacity-80 ml-2">{icon}</span>}
      </div>
    </div>
  );
}

