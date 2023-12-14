import React, {useState, useEffect} from "react"

export default function Countdown(props) {
    const {
        isRunning,
        setLayout,
        seconds,
        setSeconds,
        setAnimation,
    } = props

    const [miliseconds, setMiliseconds] = useState(0)

    useEffect(() => {
        let interval
        if (isRunning) {
            interval = setInterval(() => {
                if (miliseconds > 0) {
                    setMiliseconds(prevMiliseconds => prevMiliseconds - 1)
                } else if (seconds > 0) {
                    setSeconds(prevSeconds => prevSeconds - 1)
                    setMiliseconds(99)
                } else {
                    setAnimation('fall')
                    // setLayout('gameover')
                }
            }, 10)
        }
    
        return () => clearInterval(interval)

    }, [miliseconds, seconds, isRunning])

    // const style = seconds < 5 ? { color: 'red'} : null

    return (
        <div className="timer">
            <span>{seconds}</span>
            <span>,{String(miliseconds).padStart(2, '0')}</span>
        </div>
    )
}