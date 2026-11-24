// localStorage helpers
const STORAGE_KEY = 'sms_students'

export const SAMPLE_STUDENTS = [
  {
    id: '1',
    name: 'Aisha Patel',
    roll: 'CS2201',
    department: 'Computer Science',
    year: '2',
    email: 'aisha.patel@university.edu',
    gpa: 3.8,
    attendance: 92,
    addedAt: new Date('2024-09-01').toISOString(),
  },
  {
    id: '2',
    name: 'Rahul Mehta',
    roll: 'EE2305',
    department: 'Electrical Engineering',
    year: '3',
    email: 'rahul.mehta@university.edu',
    gpa: 3.5,
    attendance: 88,
    addedAt: new Date('2024-09-02').toISOString(),
  },
  {
    id: '3',
    name: 'Sara Kim',
    roll: 'ME2410',
    department: 'Mechanical Engineering',
    year: '4',
    email: 'sara.kim@university.edu',
    gpa: 3.9,
    attendance: 95,
    addedAt: new Date('2024-09-05').toISOString(),
  },
  {
    id: '4',
    name: 'James Okafor',
    roll: 'BU2117',
    department: 'Business Administration',
    year: '1',
    email: 'james.okafor@university.edu',
    gpa: 3.3,
    attendance: 85,
    addedAt: new Date('2024-09-10').toISOString(),
  },
]

export function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
    // First visit: seed sample data
    saveStudents(SAMPLE_STUDENTS)
    return SAMPLE_STUDENTS
  } catch {
    return SAMPLE_STUDENTS
  }
}

export function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
}
