import { Users, Plus, Globe } from 'lucide-react';
import ExportButton from './ExportButton';
import { countries } from '../utils/countriesData';

const Header = ({ onAddMember, onExportCSV, onExportPDF, userTimezone, setUserTimezone }) => {
  // Flatten all timezones from all countries and remove duplicates
  const allTimezones = Array.from(new Set(countries.flatMap(c => c.timezones))).sort();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-200">
            <Users className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Team Sync</h1>
        </div>

        <div className="hidden md:flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
          <Globe className="w-4 h-4 text-gray-400" />
          <label htmlFor="user-tz" className="text-xs font-bold text-gray-500 uppercase">Your Timezone:</label>
          <select
            id="user-tz"
            value={userTimezone}
            onChange={(e) => setUserTimezone(e.target.value)}
            className="bg-transparent text-sm font-semibold text-gray-900 outline-none focus:ring-0 cursor-pointer"
          >
            {allTimezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <ExportButton onExportCSV={onExportCSV} onExportPDF={onExportPDF} />
        <button
          onClick={onAddMember}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
