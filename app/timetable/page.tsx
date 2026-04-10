// app/timetable/page.tsx
'use client';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timetable | Campus Companion',
  description: 'Weekly class schedule - Crestwood University',
};

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

const days = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
] as const;

export default function TimetablePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Weekly Timetable</h1>
          <p className="text-gray-600 text-lg">Crestwood University • Spring Semester</p>
        </div>

        <div className="space-y-12">
          {days.map((day) => (
            <section key={day.key} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-emerald-700 text-white px-8 py-5">
                <h2 className="text-2xl font-semibold">{day.label}</h2>
              </div>

              <div className="divide-y">
                {timetableData[day.key].map((slot, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-12 px-8 py-5 gap-4 items-center ${
                      slot.subject.includes('Break') || slot.subject.includes('Lunch')
                        ? 'bg-gray-50'
                        : ''
                    }`}
                  >
                    <div className="col-span-12 md:col-span-3 font-medium text-gray-700">
                      {slot.time}
                    </div>
                    <div className="col-span-12 md:col-span-6 font-semibold text-gray-900">
                      {slot.subject}
                    </div>
                    <div className="col-span-12 md:col-span-3 text-right text-gray-600 font-medium">
                      {slot.room}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 mt-12">
          Timetable is subject to change • Please check notice board for updates
        </div>
      </div>
    </div>
  );
}