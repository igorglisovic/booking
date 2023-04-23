import { useEffect, useState } from 'react'
import './App.css'
import Calendar from './components/Calendar'

const App = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [isShow, setIsShow] = useState()

  const onClickNextHandler = () => {
    setMonth(prev => prev + 1)
  }

  const onClickBackHandler = () => {
    setMonth(prev => prev - 1)
  }

  useEffect(() => {
    if (month !== new Date().getMonth() + 1) {
      setIsShow(true)
    }

    if (month === new Date().getMonth() + 1) {
      setIsShow(false)
    }
  }, [month])

  return (
    <main>
      {isShow && (
        <button
          className="back-arrow"
          onClick={onClickBackHandler}
        >{`<`}</button>
      )}
      <Calendar year={year} month={month} />
      <Calendar year={year} month={month + 1} />
      <button className="next-arrow" onClick={onClickNextHandler}>{`>`}</button>
    </main>
  )
}

export default App
