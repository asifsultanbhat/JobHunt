export default function TrackerPage() {
  const columns = [
    { title: "Saved", count: 3, color: "bg-gray-100" },
    { title: "Applied", count: 5, color: "bg-blue-50" },
    { title: "Interviewing", count: 2, color: "bg-purple-50" },
    { title: "Offer", count: 1, color: "bg-green-50" },
    { title: "Rejected", count: 4, color: "bg-red-50" },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Application Tracker</h1>
        <p className="text-gray-500">Manage and track your active job applications.</p>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col.title} className={\`\${col.color} w-80 shrink-0 rounded-xl p-4 flex flex-col border border-border/50\`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">{col.title}</h3>
              <span className="bg-white text-xs font-bold px-2 py-1 rounded-full text-gray-500 shadow-sm border">
                {col.count}
              </span>
            </div>
            
            <div className="flex-1 space-y-3">
              {/* Dummy Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:border-blue-300 hover:shadow-md transition">
                <h4 className="font-semibold text-sm">Technical Support Engineer</h4>
                <p className="text-xs text-blue-600 font-medium">Acme Corp</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-gray-400">12 days ago</span>
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">AS</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
