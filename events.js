// Dates are relative to today so seed events always show as upcoming.
const inDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toLocaleDateString('en-CA'); };

export const seedEvents = () => [
  { id: 'e1', title: 'Indie Founders Meetup', date: inDays(6), time: '18:00', category: 'Business', location: 'Sector 62, Noida', price: 0, capacity: 80, baseGoing: 34,
    description: 'A casual evening for early-stage founders to swap notes on fundraising, hiring and staying sane. Snacks and networking included.' },
  { id: 'e2', title: 'Campus Battle of Bands', date: inDays(12), time: '18:30', category: 'Music', location: 'University Auditorium, Bareilly', price: 150, capacity: 400, baseGoing: 212,
    description: 'Six student bands, one trophy. Doors open at 6, first act at 6:30. Bring friends and make some noise.' },
  { id: 'e3', title: 'React & Real Projects Workshop', date: inDays(9), time: '10:00', category: 'Tech', location: 'CS Department Lab 3, Chandigarh', price: 0, capacity: 40, baseGoing: 28,
    description: 'Hands-on session building a small app with components, props, hooks, routing and Redux Toolkit. Bring a laptop.' },
  { id: 'e4', title: 'Inter-College Football Cup', date: inDays(20), time: '09:00', category: 'Sports', location: 'University Sports Ground, Patiala', price: 50, capacity: 500, baseGoing: 160,
    description: 'Quarter-finals kick off at 9am. Come cheer, or join the open 5-a-side slot after the matches.' },
  { id: 'e5', title: 'Street Art & Sketching Walk', date: inDays(14), time: '16:00', category: 'Art', location: 'Old Town Market Street, Jaipur', price: 100, capacity: 30, baseGoing: 21,
    description: 'A guided sketch walk through the old market. Materials provided, all skill levels welcome.' },
  { id: 'e6', title: 'Late Night Ramen Pop-Up', date: inDays(16), time: '20:00', category: 'Food', location: 'Civil Lines Food Court, Delhi', price: 299, capacity: 60, baseGoing: 47,
    description: 'A one-night ramen stall run by a local chef. Bowls are served until they run out, so come early.' },
  { id: 'e7', title: 'Startup Pitch Night', date: inDays(25), time: '17:00', category: 'Business', location: 'Innovation Cell, Chandigarh', price: 0, capacity: 120, baseGoing: 66,
    description: 'Five student startups pitch to a small panel of local investors. Open floor for feedback after.' },
  { id: 'e8', title: 'Open Mic: Music & Poetry', date: inDays(8), time: '17:30', category: 'Music', location: 'Central Library Lawn, Delhi', price: 0, capacity: 100, baseGoing: 52,
    description: 'Sign up on arrival, five minutes per slot. Bring your own instrument if you need one.' },
  { id: 'e9', title: 'Hack the Campus 24h', date: inDays(30), time: '09:00', category: 'Tech', location: 'Engineering Block, Noida', price: 200, capacity: 150, baseGoing: 98,
    description: 'A 24-hour hackathon for student teams. Mentors, food and prizes. Teams of up to four.' },
  { id: 'e10', title: 'Sunrise 10K Run', date: inDays(11), time: '05:30', category: 'Sports', location: 'Sukhna Lake, Chandigarh', price: 250, capacity: 300, baseGoing: 141,
    description: 'A friendly 10K along the lake. Finisher medals and a healthy breakfast for everyone.' },
  { id: 'e11', title: 'Clay & Pottery Evening', date: inDays(18), time: '17:00', category: 'Art', location: 'Studio Lane, Jaipur', price: 450, capacity: 20, baseGoing: 14,
    description: 'Learn wheel-throwing basics and take your first bowl home once it is fired. No experience needed.' },
  { id: 'e12', title: 'Street Food Trail', date: inDays(22), time: '18:00', category: 'Food', location: 'Chandni Chowk, Delhi', price: 350, capacity: 25, baseGoing: 19,
    description: 'A guided evening walk through eight legendary food stalls with a local food writer.' }
].map((e) => ({ ...e, hostEmail: '', hostName: 'EventSphere Team' }));
