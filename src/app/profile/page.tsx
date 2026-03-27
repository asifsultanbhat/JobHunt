import { auth, currentUser } from "@clerk/nextjs/server";
import { User } from "lucide-react";

export default async function ProfilePage() {
  const user = await currentUser();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-gray-500">Manage your job search preferences and base resume.</p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="Profile" className="w-full h-full rounded-full" />
            ) : (
              <User className="w-8 h-8" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
            <p className="text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
          </div>
        </div>

        <div className="p-6 space-y-6 form-group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Roles</label>
              <input type="text" defaultValue="Technical Support Engineer, CSM" className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Salary Requirement</label>
              <input type="text" defaultValue="₹5,00,000/year" className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shift Preference</label>
              <select className="w-full p-2 border rounded-md">
                <option>US Shift</option>
                <option>UK Shift</option>
                <option>IST Shift</option>
                <option>Any</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location / Work Type</label>
              <input type="text" defaultValue="Remote India" className="w-full p-2 border rounded-md" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Core Skills (comma separated)</label>
            <textarea rows={2} defaultValue="REST APIs, Zendesk, Jira, Slack, Zapier, JSON, Postman, SaaS Support" className="w-full p-2 border rounded-md"></textarea>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
