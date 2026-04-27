const TimelineChart = ({ members, overlaps }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 card-shadow">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Team Availability (UTC)</h3>

      <div className="relative overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          {/* Time markers */}
          <div className="flex border-b border-gray-100 mb-2">
            <div className="w-32 flex-shrink-0"></div>
            {hours.map(h => (
              <div key={h} className="flex-1 text-[10px] text-gray-400 text-center border-l border-gray-50 h-6">
                {h}:00
              </div>
            ))}
          </div>

          {/* Member rows */}
          <div className="space-y-4">
            {members.map(member => (
              <div key={member.id} className="flex items-center">
                <div className="w-32 flex-shrink-0 flex items-center space-x-2">
                  <span className="text-xs font-bold text-gray-700 truncate">{member.name}</span>
                  <span className="text-xs">{member.flag}</span>
                </div>
                <div className="flex-1 flex h-8 bg-gray-50 rounded-md relative overflow-hidden">
                  {member.startUTC <= member.endUTC ? (
                    <div
                      className="absolute h-full bg-blue-100 border-x border-blue-200"
                      style={{
                        left: `${(member.startUTC / 1440) * 100}%`,
                        width: `${((member.endUTC - member.startUTC) / 1440) * 100}%`
                      }}
                    ></div>
                  ) : (
                    <>
                      <div
                        className="absolute h-full bg-blue-100 border-x border-blue-200"
                        style={{
                          left: `${(member.startUTC / 1440) * 100}%`,
                          width: `${((1440 - member.startUTC) / 1440) * 100}%`
                        }}
                      ></div>
                      <div
                        className="absolute h-full bg-blue-100 border-x border-blue-200"
                        style={{
                          left: '0%',
                          width: `${(member.endUTC / 1440) * 100}%`
                        }}
                      ></div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Overlap row */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex items-center">
            <div className="w-32 flex-shrink-0">
              <span className="text-xs font-bold text-success uppercase tracking-wider">Overlap</span>
            </div>
            <div className="flex-1 flex h-10 bg-gray-50 rounded-md relative overflow-hidden">
              {overlaps.map((overlap, idx) => (
                <div
                  key={idx}
                  className="absolute h-full bg-success opacity-40 border-x border-success"
                  style={{
                    left: `${(overlap.start / 1440) * 100}%`,
                    width: `${((overlap.end - overlap.start) / 1440) * 100}%`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center space-x-6 text-xs font-medium text-gray-500">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded-sm mr-2"></div>
          <span>Unavailable</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded-sm mr-2"></div>
          <span>Working Hours</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-success opacity-40 border border-success rounded-sm mr-2"></div>
          <span>Overlap Window</span>
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;
