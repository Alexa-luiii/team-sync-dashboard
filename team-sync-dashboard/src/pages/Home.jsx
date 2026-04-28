import { useState } from 'react';
import Header from '../components/Header';
import TeamMemberCard from '../components/TeamMemberCard';
import AddMemberModal from '../components/AddMemberModal';
import TimelineChart from '../components/TimelineChart';
import BestTimeCard from '../components/BestTimeCard';
import { localToUTCMinutes, utcMinutesToLocal } from '../utils/timezoneConverter';
import { findOverlaps, suggestCompromise } from '../utils/overlapEngine';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DateTime } from 'luxon';

const Home = () => {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const handleAddMember = (newMember) => {
    const memberWithUTC = {
      ...newMember,
      startUTC: localToUTCMinutes(newMember.startTime, newMember.timezone),
      endUTC: localToUTCMinutes(newMember.endTime, newMember.timezone),
    };
    setMembers([...members, memberWithUTC]);
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const format12h = (timeStr) => {
    return DateTime.fromFormat(timeStr, 'HH:mm').toFormat('h:mm a');
  };

  const handleExportCSV = () => {
    if (members.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Name,Country,Timezone,Working Hours\n"
      + members.map(m => `${m.name},${m.country},${m.timezone},${format12h(m.startTime)} - ${format12h(m.endTime)}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "team_schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    if (members.length === 0) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Team Sync Schedule', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on ${new Date().toLocaleDateString()} (User TZ: ${userTimezone})`, 14, 30);

    const tableRows = members.map(m => [m.name, m.country, m.timezone, `${format12h(m.startTime)} - ${format12h(m.endTime)}`]);
    doc.autoTable({
      head: [['Name', 'Country', 'Timezone', 'Working Hours (Local)']],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] }
    });

    const overlaps = findOverlaps(members);
    const compromise = overlaps.length === 0 ? suggestCompromise(members) : null;

    let finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setTextColor(0);
    if (overlaps.length > 0) {
      doc.text('Best Meeting Time:', 14, finalY);
      overlaps.forEach((o, i) => {
        doc.setFontSize(12);
        doc.text(`${utcMinutesToLocal(o.start, userTimezone)} - ${utcMinutesToLocal(o.end, userTimezone)} (${userTimezone})`, 14, finalY + 7 + (i * 7));
      });
    } else if (compromise) {
      doc.text('Optimal Compromise Time:', 14, finalY);
      doc.setFontSize(12);
      doc.text(`${utcMinutesToLocal(compromise.start, userTimezone)} - ${utcMinutesToLocal(compromise.end, userTimezone)} (${compromise.count} members available)`, 14, finalY + 7);
    }

    doc.save('team_schedule.pdf');
  };

  const overlaps = findOverlaps(members);
  const compromise = overlaps.length === 0 ? suggestCompromise(members) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header
        onAddMember={() => setIsModalOpen(true)}
        onExportCSV={handleExportCSV}
        onExportPDF={handleExportPDF}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Team List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
              {members.length} Total
            </span>
          </div>

          <div className="space-y-4">
            {members.map(member => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onDelete={handleDeleteMember}
              />
            ))}
            {members.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No members added yet.</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 text-blue-600 font-medium hover:underline"
                >
                  Add your first member
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Visualization */}
        <div className="lg:col-span-8 space-y-8">
          {members.length > 0 ? (
            <>
              <BestTimeCard
                overlaps={overlaps}
                compromise={compromise}
                userTimezone={userTimezone}
              />

              <TimelineChart
                members={members}
                overlaps={overlaps}
              />
            </>
          ) : (
            <div className="bg-white p-12 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center space-y-4 card-shadow">
              <div className="bg-blue-50 p-4 rounded-full">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Visual Timeline</h3>
              <p className="text-gray-500 max-w-sm">
                Add team members to see their working hours and find the best overlapping meeting times.
              </p>
            </div>
          )}
        </div>
      </main>

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMember}
      />
    </div>
  );
};

export default Home;
