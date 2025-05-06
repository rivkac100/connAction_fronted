// בס"ד

import { DayView } from "../DayView/dayView";

const MonthView = ({ currentDate , setDayDate , setMonthName}) => {
  const renderMonthDays = () => {
    // Get the first day of the month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayWeekday = firstDayOfMonth.getDay();

    // Calculate the number of days in the month
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

    // Create calendar cells array
    const calendarCells = [];

    // Add weekday headers
    weekDays.forEach(day => {
      calendarCells.push(
        <div key={`header-${day}`} style={{

          // backgroundColor: '#4CAF50',
          color: 'white',
          height:'4vh',
          padding: "10px",
          textAlign: 'center',
          fontWeight: 'bold',
          background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: '5px'
        }}>
          {day}
        </div>
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      calendarCells.push(
        <div key={`empty-${i}`} style={{
          border: "1px solid #eee",
          padding: "10px",
          height:'4vh',
          textAlign: 'center',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9'
        }}></div>
      );
    }

    // Add cells for each day of the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      calendarCells.push(
        <div onClick={() => {setDayDate(date); setMonthName(monthNames[date.getMonth()])}}
          key={`day-${day}`} style={{
          border: "1px solid #ccc",
          padding: "10px",
          textAlign: 'center',
          height:'4vh',
          borderRadius: '5px',
          color:isToday?'white':'black',         
          backgroundColor: isToday ? '#764ba2' : 'white'
        }}>
          {day}
        </div>
      );
    }

    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px"
      }}>
        {calendarCells}
      </div>
    );
  };

  const monthNames = [
    'ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];

  return (
    <div style={{
      padding: "20px",
      border: "3px solid #764ba2",
      height:"55vh",
      margin:"5% 20%",
      width:"60%",
      borderRadius: "10px",
      // boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: 'center' }}>
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
      {renderMonthDays()}
    </div>
  );
};

export default MonthView;

// const MonthView = ({ currentDate }) => {
//   const getStartOfMonth = (date) => {
//     return new Date(date.getFullYear(), date.getMonth(), 1);
//   };

//   const renderMonthDays = () => {
//     const startOfMonth = getStartOfMonth(currentDate);
//     const daysInMonth = new Date(
//       startOfMonth.getFullYear(),
//       startOfMonth.getMonth() + 1,
//       0
//     ).getDate();
//     const monthDays = [];

//     for (let i = 1; i <= daysInMonth; i++) {
//       monthDays.push(
//         new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), i)
//       );
//     }

//     const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//     return (
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
//         {weekDays.map((day) => (
//           <div key={day} style={{
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             padding: "10px",
//             textAlign: 'center',
//             fontWeight: 'bold',
//             borderRadius: '5px'
//           }}>
//             {day}
//           </div>
//         ))}
//         {monthDays.map((day) => (
//           <div key={day} style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             textAlign: 'center',
//             borderRadius: '5px',
//             backgroundColor: day === new Date() ? '#ffeb3b' : 'white' // Highlight today's date
//           }}>
//             {day.getDate()} / {day.getMonth() + 1}/{day.getFullYear()}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
//       <h2 style={{ textAlign: 'center' }}>Month View</h2>
//       {renderMonthDays()}
//     </div>
//   );
// };
// export default MonthView;