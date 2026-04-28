import { Users, Plus } from 'lucide-react';
import ExportButton from './ExportButton';

const Header = ({ onAddMember, onExportCSV, onExportPDF }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-2">
        <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-200">
          <Users className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Team Sync</h1>
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
