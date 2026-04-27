import { useState } from 'react';
import Header from '../components/Header';
import TeamMemberCard from '../components/TeamMemberCard';
import AddMemberModal from '../components/AddMemberModal';
import TimelineChart from '../components/TimelineChart';
import BestTimeCard from '../components/BestTimeCard';
import sampleData from '../data/sampleTeam.json';
import { localToUTCMinutes } from '../utils/timezoneConverter';
import { findOverlaps, suggestCompromise } from '../utils/overlapEngine';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const initialMembers = sampleData.map(m => ({
  ...m,
  startUTC: localToUTCMinutes(m.startTime, m.timezone),
  endUTC: localToUTCMinutes(m.endTime, m.timezone),
}));

const Home = () => {
  const [members, setMembers] = useState(initialMembers);
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

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Name,Country,Timezone,Start Time,End Time\n"
      + members.map(m => `${m.name},${m.country},${m.timezone},${m.startTime},${m.endTime}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "team_schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Team Sync Schedule', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on ${new Date().toLocaleDateString()} (User TZ: ${userTimezone})`, 14, 30);

    const tableRows = members.map(m => [m.name, m.country, m.timezone, `${m.startTime} - ${m.endTime}`]);
    doc.autoTable({
      head: [['Name', 'Country', 'Timezone', 'Working Hours (Local)']],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] }
    });

    doc.save('team_schedule.pdf');
  };

  const overlaps = findOverlaps(members);
  const compromise = overlaps.length === 0 ? suggestCompromise(members) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header
        onAddMember={() => setIsModalOpen(true)}
        onExport={handleExportPDF} // Changed to PDF for the main export button, or could be a dropdown
      />

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
            <div className="flex items-center space-x-2">
               <button onClick={handleExportCSV} className="text-xs text-blue-600 hover:underline">CSV</button>
               <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                {members.length} Total
              </span>
            </div>
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
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <BestTimeCard
            overlaps={overlaps}
            compromise={compromise}
            userTimezone={userTimezone}
          />

          <TimelineChart
            members={members}
            overlaps={overlaps}
          />
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
