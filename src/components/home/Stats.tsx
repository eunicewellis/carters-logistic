const STATS = [
  { value: "120K+", label: "Shipments Delivered" },
  { value: "48", label: "States Covered" },
  { value: "15+", label: "Years in Business" },
  { value: "99.2%", label: "On-Time Delivery" },
];

export function Stats() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="container-site grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-4xl font-bold text-brand-900">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
