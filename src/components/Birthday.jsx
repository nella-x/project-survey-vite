import { useState } from "react";
import PropTypes from "prop-types";

const daysInMonth = (month) => {
  return new Date(2024, month + 1, 0).getDate(); // Fix month index
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DayDropdown = ({ onChange, selectedMonth, selectedDay }) => {
  const maxDays = selectedMonth ? daysInMonth(selectedMonth - 1) : 31;

  return (
    <select onChange={(e) => onChange(parseInt(e.target.value, 10) || null)} value={selectedDay || ""}>
      <option value="">Day</option>
      {Array.from({ length: maxDays }, (_, i) => i + 1).map(day => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
};

DayDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedMonth: PropTypes.number,
  selectedDay: PropTypes.number,
};

export const MonthDropdown = ({ onChange, selectedMonth }) => {
  return (
    <select onChange={(e) => onChange(parseInt(e.target.value, 10) || null)} value={selectedMonth || ""}>
      <option value="">Month</option>
      {months.map((month, index) => (
        <option key={month} value={index + 1}>
          {month}
        </option>
      ))}
    </select>
  );
};

MonthDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedMonth: PropTypes.number,
};

export const Form = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Day:", selectedDay);
    console.log("Selected Month:", selectedMonth);
  };

  // Kontrollera att både dag och månad är giltiga
  const isFormValid = selectedDay !== null && selectedMonth !== null;

  return (
    <form onSubmit={handleSubmit}>
      <MonthDropdown
        onChange={(month) => setSelectedMonth(month)}
        selectedMonth={selectedMonth}
      />
      <DayDropdown
        onChange={(day) => setSelectedDay(day)}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
      />
      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
};
