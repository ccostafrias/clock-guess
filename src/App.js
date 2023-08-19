import React, { useState, useEffect, useRef } from "react"

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current && htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}

export default function App() {
    const [dashs, setdashs] = useState(Array(6).fill())
    const [clock, setClock] = useState({
        hours: 0,
        minutes: 0
    })
    const [timeInput, setTimeInput] = useState(0)
    const [timeFocus, setTimeFocus] = useFocus()

    useEffect(() => {
        setdashs(prevdashs => {
            return prevdashs.map((dash, i) => {
                const style = { transform: `translate(-50%, -50%) rotate(${i*30}deg)` }

                return (
                    <div 
                        key={i}
                        className="dash" 
                        style={style}
                    />
                )
            })
        })
        setTime()
    }, [])

    function setTime() {
        const random = (max) =>  Math.floor(Math.random() * max)
        setClock({
            hours: random(12),
            minutes: random(60)
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        setTime()
        setTimeInput(0)
    }

    function handleChange(event) {
        const {name, value} = event.target
        const re = /\d/gi
        let time = value.toString().match(re)?.join('')
        time = !time ? 0 : time
        time = parseInt(time) > 2400 ? 0 : time
        setTimeInput(parseInt(time))
    }

    function format(time) {
        const padded = ('0000' + time).slice(-4)
        const formated = `${padded.slice(0, -2)}h${padded.slice(2)}`
        return formated
    }

    const transform = (angle) => `translateX(-50%) rotate(${angle}deg)`
    const rightMin = (min) => min * 6
    const rightHour = (hour, min) => (hour * 30) + (min / 60 * 30)

    return (
        <main>
            {/* <span>{`${clock.hours}h${clock.minutes}min`}</span> */}
            <div className="clock">
                <div className="dashs">
                    {dashs}
                </div>
                <div 
                    className="pointer pointer-min"
                    style={{
                        transform: transform(rightMin(clock.minutes)),
                    }}>
                </div>
                <div 
                    className="pointer pointer-hour"
                    style={{
                        transform: transform(rightHour(clock.hours, clock.minutes))
                    }}>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="time"
                        className="time-input"
                        value={format(timeInput)}
                        onChange={handleChange}
                        autoFocus
                    />
            </form>
        </main>
    )
}