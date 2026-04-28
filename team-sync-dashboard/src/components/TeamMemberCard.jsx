import { useState, useEffect } from 'react';
import { Trash2, Clock, Globe, MapPin } from 'lucide-react';
import { DateTime } from 'luxon';

const TeamMemberCard = ({ member, onDelete }) => {
  const [localTime, setLocalTime] = useState(
    DateTime.now().setZone(member.timezone).toFormat('h:mm a')
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTime(DateTime.now().setZone(member.timezone).toFormat('h:mm a'));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [member.timezone]);

  // Helper to format 24h string to 12h AM/PM
  const format12h = (timeStr) => {
    return DateTime.fromFormat(timeStr, 'HH:mm').toFormat('h:mm a');
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 card-shadow transition-all hover:border-blue-200 group">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
            {member.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <span className="text-lg" title={member.country}>{member.flag}</span>
            </div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{member.country}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(member.id)}
          className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Globe className="w-4 h-4 mr-2 text-gray-400" />
          <span className="truncate" title={member.timezone}>{member.timezone}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-gray-400" />
          <span className="font-medium text-gray-800">
            {format12h(member.startTime)} - {format12h(member.endTime)}
          </span>
          <span className="ml-2 text-xs text-gray-400 font-normal">Working Hours</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 pt-1 border-t border-gray-50">
          <MapPin className="w-4 h-4 mr-2 text-blue-400" />
          <span className="font-bold text-blue-600">Local Time: {localTime}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
