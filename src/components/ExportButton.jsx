import { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, FileText, Table } from 'lucide-react';

const ExportButton = ({ onExportCSV, onExportPDF }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
      >
        <Download className="w-4 h-4" />
        <span>Export</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => {
              onExportCSV();
              setIsOpen(false);
            }}
            className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <Table className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Export as CSV</span>
          </button>
          <button
            onClick={() => {
              onExportPDF();
              setIsOpen(false);
            }}
            className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Export as PDF</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
