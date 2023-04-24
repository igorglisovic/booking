import React from 'react'
import { useEffect, useState } from 'react'
import '../App.css'

const Calendar = ({ year, month }) => {
  const [calendarRows, setCalendarRows] = useState([])
  const [calendarCells, setCalendarCells] = useState([])
  const [yearAndMonth, setYearAndMonth] = useState()
  const [clickedDate, setClickedDate] = useState()
  const [disabledDaysInMonth, setDisabledDaysInMonth] = useState()

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const currentDate = new Date()

  useEffect(() => {
    const numberOfDaysInMonth = new Date(year, month, 0).getDate()
    let firstDayInMonth = new Date(year, month - 1, 1).getDay()
    const currentDayInMonth = new Date().getDate()
    console.log(currentDayInMonth)

    const yearAndMonthStr = `${new Date(year, month - 1).toLocaleString(
      'default',
      {
        month: 'long',
      }
    )} ${new Date(year, month - 1).getFullYear()} `

    let numberOfRows
    let cells = []
    let rows = []

    setYearAndMonth(yearAndMonthStr)

    // Setting index 7 for sunday
    if (firstDayInMonth === 0) firstDayInMonth = 7

    // Calculating number of rows based on number of days and first day in month
    if (
      (numberOfDaysInMonth === 31 && firstDayInMonth === 6) ||
      firstDayInMonth === 7
    ) {
      numberOfRows = 6
    } else if (numberOfDaysInMonth === 30 && firstDayInMonth === 0) {
      numberOfRows = 6
    } else if (numberOfDaysInMonth === 28 && firstDayInMonth !== 1) {
      numberOfRows = 5
    } else if (numberOfDaysInMonth === 28 && firstDayInMonth === 1) {
      numberOfRows = 4
    } else if (numberOfDaysInMonth === 29) {
      numberOfRows = 5
    } else {
      numberOfRows = 5
    }

    let date = 1
    for (let i = 0; i < numberOfRows; i++) {
      rows.push('')

      for (let j = 0; j < 7; j++) {
        if (firstDayInMonth > date && firstDayInMonth !== 0) {
          cells.push('')
        } else if (
          firstDayInMonth <= date &&
          date - firstDayInMonth + 1 <= numberOfDaysInMonth
        ) {
          cells.push({
            value: date - firstDayInMonth + 1,
            disabled:
              currentDayInMonth - 1 > date - firstDayInMonth + 1 &&
              month - 1 === currentDate.getMonth()
                ? true
                : false,
            month,
          })
        }

        date++
      }
    }

    console.log(cells)

    setDisabledDaysInMonth(currentDayInMonth - 1)
    setCalendarRows(rows)
    setCalendarCells(cells)
  }, [month])

  const onClickHandler = (e, j, i) => {
    const clickedCell = calendarCells[i * 7 + j]
    if (clickedCell.disabled || !clickedCell.value) return

    console.log(calendarCells, i, j)

    setClickedDate({
      value: clickedCell.value,
      month: clickedCell.month,
    })
    // console.log(clickedDate)
  }

  return (
    <table className="calendar">
      <caption>{yearAndMonth}</caption>
      <thead>
        <tr>
          {daysOfWeek.map(day => (
            <td key={day}>{day}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {calendarRows.map((_, i) => (
          <tr key={i}>
            {calendarCells.slice(i * 7, i * 7 + 7).map((cell, j) => (
              <td
                className={`${
                  clickedDate?.value === cell.value && cell.value
                    ? 'selected'
                    : ''
                } ${cell.disabled ? 'disabled' : ''}`}
                onClick={e => onClickHandler(e, j, i)}
                key={j}
              >
                {cell.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Calendar
