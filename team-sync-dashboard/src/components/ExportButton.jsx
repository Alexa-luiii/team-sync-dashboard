
import { Download } from 'lucide-react';

const ExportButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
    >
      <Download className="w-4 h-4" />
      <span>Export</span>
    </button>
  );
};

export default ExportButton;
