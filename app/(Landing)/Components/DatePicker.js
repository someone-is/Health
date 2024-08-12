'use client';
import React, { useState } from 'react';
import styles from './DatePicker.module.css';
import ShinyRippleButton from '@/app/(Account)/Components/Button/ShinyRipplebutton';
// import ShinyRippleButton from '@/app/(Account)/Account/Components/ShinyRipplebutton';

const DatePicker = ({ selectedDate, handleDateChange, id}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className={styles.datePicker}>
      <input
        type="text"
        id={id}
        readOnly
        value={selectedDate ? selectedDate.toLocaleDateString('en-GB') : ''}
        onClick={toggleCalendar}
        className={styles.input}
      />
      {showCalendar && (
        <Calendar selectedDate={selectedDate} handleDateChange={handleDateChange} toggleCalendar={toggleCalendar}/>
      )}
    </div>
  );
};

const Calendar = ({ selectedDate, handleDateChange, toggleCalendar }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate ? selectedDate.getMonth() : new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  const daysArray = [];
  for (let i = 0; i < startDay; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const changeMonth = (offset) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handlePrevClick = (event) => {
    event.preventDefault();
    changeMonth(-1);
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    changeMonth(1);
  };

  const handleDayClick = (day) => {
    if (day) {
      handleDateChange(new Date(currentYear, currentMonth, day));

    }
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button className={styles.button} type="button" onClick={handlePrevClick}>&lt;-</button>
        <div>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}, {currentYear}</div>
        <button className={styles.button} type="button" onClick={handleNextClick}>-&gt;</button>
      </div>
      <div className={styles.calendarBody}>
        <div className={styles.calendarWeekdays}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className={styles.calendarDays}>
          {daysArray.map((day, index) => (
            <ShinyRippleButton
              key={index}
              bgColourLeave='white'
              bgColourover='white'
              extraMove={35}
              extraLeave={20}
              CustomDesign={`${styles.calendarDay} ${day === selectedDate?.getDate() ? styles.selected : ''}`}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </ShinyRippleButton>
          ))}
        </div>
          <ShinyRippleButton typeC='button' CustomDesign={styles.Subbtn} children={"Set Date"} bgColourLeave='#007bff' bgColourover='#007bff' extraLeave={120} extraMove={280} onClick={toggleCalendar}/>
      </div>
    </div>
  );
};

export default DatePicker;
