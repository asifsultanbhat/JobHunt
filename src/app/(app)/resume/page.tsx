export default function ResumeBuilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Resume Builder</h1>
        <p className="text-gray-500">Automatically tailor your resume for specific job applications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col gap-4">
          <h2 className="text-lg font-semibold">1. Base Details</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Job Description</label>
            <textarea 
              rows={6}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Paste the job description here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Base Resume</label>
            <textarea 
              rows={8}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Paste your standard resume payload..."
            />
          </div>

          <button className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
            Generate Tailored Resume
          </button>
        </div>

        {/* Output Panel */}
        <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">2. Tailored Output</h2>
            <button className="text-sm px-3 py-1.5 bg-white border shadow-sm rounded-md font-medium text-gray-700 hover:bg-gray-50">
              Export PDF
            </button>
          </div>
          
          <div className="flex-1 bg-white p-6 border rounded-md shadow-sm overflow-auto text-sm text-gray-700 whitespace-pre-wrap font-mono relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Output will appear here...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
