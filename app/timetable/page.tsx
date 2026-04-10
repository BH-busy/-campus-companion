'use client';

import Navbar from '../../components/Navbar';

const timetableData = {
  monday: [
    { time: '9:00 AM - 10:30 AM', subject: 'Programming Fundamentals', room: 'CS-101' },
    { time: '10:30 AM - 11:00 AM', subject: 'Break', room: '' },
    { time: '11:00 AM - 12:30 PM', subject: 'Data Structures', room: 'CS-102' },
    { time: '12:30 PM - 1:30 PM', subject: 'Lunch Break', room: '' },
    { time: '1:30 PM - 3:00 PM', subject: 'Database Management', room: 'CS-103' },
    { time: '3:00 PM - 3:30 PM', subject: 'Break', room: '' },
    { time: '3:30 PM - 5:00 PM', subject: 'Computer Networks', room: 'CS-104' },
  ],
  tuesday: [
    { time: '9:00 AM - 10:30 AM', subject: 'Algorithms', room: 'CS-105' },
    { time: '10:30 AM - 11:00 AM', subject: 'Break', room: '' },
    { time: '11:00 AM - 12:30 PM', subject: 'Operating Systems', room: 'CS-106' },
    { time: '12:30 PM - 1:30 PM', subject: 'Lunch Break', room: '' },
    { time: '1:30 PM - 3:00 PM', subject: 'Software Engineering', room: 'CS-107' },
    { time: '3:00 PM - 3:30 PM', subject: 'Break', room: '' },
    { time: '3:30 PM - 5:00 PM', subject: 'Web Development', room: 'CS-108' },
  ],
  wednesday: [
    { time: '9:00 AM - 10:30 AM', subject: 'Data Structures Lab', room: 'Lab-201' },
    { time: '10:30 AM - 11:00 AM', subject: 'Break', room: '' },
    { time: '11:00 AM - 12:30 PM', subject: 'Database Lab', room: 'Lab-202' },
    { time: '12:30 PM - 1:30 PM', subject: 'Lunch Break', room: '' },
    { time: '1:30 PM - 3:00 PM', subject: 'Programming Fundamentals', room: 'CS-101' },
    { time: '3:00 PM - 3:30 PM', subject: 'Break', room: '' },
    { time: '3:30 PM - 5:00 PM', subject: 'Algorithms', room: 'CS-105' },
  ],
  thursday: [
    { time: '9:00 AM - 10:30 AM', subject: 'Computer Networks Lab', room: 'Lab-203' },
    { time: '10:30 AM - 11:00 AM', subject: 'Break', room: '' },
    { time: '11:00 AM - 12:30 PM', subject: 'Operating Systems', room: 'CS-106' },
    { time: '12:30 PM - 1:30 PM', subject: 'Lunch Break', room: '' },
    { time: '1:30 PM - 3:00 PM', subject: 'Software Engineering', room: 'CS-107' },
    { time: '3:00 PM - 3:30 PM', subject: 'Break', room: '' },
    { time: '3:30 PM - 5:00 PM', subject: 'Web Development Lab', room: 'Lab-204' },
  ],
  friday: [
    { time: '9:00 AM - 10:30 AM', subject: 'Machine Learning', room: 'CS-109' },
    { time: '10:30 AM - 11:00 AM', subject: 'Break', room: '' },
    { time: '11:00 AM - 12:30 PM', subject: 'Project Work', room: 'CS-110' },
    { time: '12:30 PM - 1:30 PM', subject: 'Lunch Break', room: '' },
    { time: '1:30 PM - 3:00 PM', subject: 'Seminar/Guest Lecture', room: 'Auditorium' },
    { time: '3:00 PM - 3:30 PM', subject: 'Break', room: '' },
    { time: '3:30 PM - 5:00 PM', subject: 'Review Session', room: 'CS-101' },
  ],
};

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export default function TimetablePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Computer Science Timetable</h1>
          <p className="text-gray-600">Weekly class schedule for Computer Science students</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                  {days.map((day) => (
                    <th key={day} className="px-6 py-4 text-left text-sm font-semibold text-gray-900 capitalize">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {timetableData.monday.map((slot, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {slot.time}
                    </td>
                    {days.map((day) => {
                      const daySlot = timetableData[day as keyof typeof timetableData][index];
                      return (
                        <td key={day} className="px-6 py-4">
                          <div className="text-sm">
                            <div className={`font-medium ${
                              daySlot.subject.includes('Break') || daySlot.subject.includes('Lunch')
                                ? 'text-gray-500'
                                : 'text-gray-900'
                            }`}>
                              {daySlot.subject}
                            </div>
                            {daySlot.room && (
                              <div className="text-gray-500 text-xs mt-1">
                                {daySlot.room}
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Notes</h2>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All classes are 90 minutes long with 30-minute breaks</li>
            <li>• Lab sessions are hands-on practical sessions</li>
            <li>• Project work includes individual and group assignments</li>
            <li>• Seminar sessions feature guest speakers and industry experts</li>
            <li>• Room numbers are subject to change - please check notices</li>
          </ul>
        </div>
      </main>
    </div>
  );
}