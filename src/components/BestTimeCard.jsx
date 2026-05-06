import { Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { utcMinutesToLocal } from '../utils/timezoneConverter';

const BestTimeCard = ({ overlaps, compromise, userTimezone }) => {
  const hasOverlap = overlaps && overlaps.length > 0;

  if (!hasOverlap && !compromise) return null;

  return (
    <div className={`p-6 rounded-xl border card-shadow ${hasOverlap ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${hasOverlap ? 'bg-success text-white' : 'bg-amber-500 text-white'}`}>
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${hasOverlap ? 'text-green-900' : 'text-amber-900'}`}>
              {hasOverlap ? 'Best Meeting Time' : 'Optimal Compromise'}
            </h3>
            <p className={`text-sm ${hasOverlap ? 'text-green-700' : 'text-amber-700'}`}>
              {hasOverlap ? 'Everyone is available during these hours.' : 'Highest possible team availability found.'}
            </p>
          </div>
        </div>
        {hasOverlap ? (
          <CheckCircle2 className="text-success w-6 h-6" />
        ) : (
          <AlertCircle className="text-amber-500 w-6 h-6" />
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {hasOverlap ? (
          overlaps.map((o, idx) => (
            <div key={idx} className="bg-white px-4 py-3 rounded-lg border border-green-200 shadow-sm transition-all hover:shadow-md">
              <span className="text-2xl font-bold text-gray-900">
                {utcMinutesToLocal(o.start, userTimezone)} – {utcMinutesToLocal(o.end, userTimezone)}
              </span>
              <p className="text-xs text-gray-500 mt-1 uppercase font-semibold">Your Local Time ({userTimezone})</p>
            </div>
          ))
        ) : (
          <div className="bg-white px-4 py-3 rounded-lg border border-amber-200 shadow-sm">
            <span className="text-2xl font-bold text-gray-900">
              {utcMinutesToLocal(compromise.start, userTimezone)} – {utcMinutesToLocal(compromise.end, userTimezone)}
            </span>
            <p className="text-xs text-gray-500 mt-1 uppercase font-semibold">
              Compromise window ({compromise.count} members available)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestTimeCard;
