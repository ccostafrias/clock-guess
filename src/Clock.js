import React, { useState, useEffect, useRef } from "react"

import Countdown from "./Countdown"

export default function Clock(props) {
    const {
        setSeconds,
        animation,
    } = props

    const [dashs, setdashs] = useState(Array(12).fill())
    const [clock, setClock] = useState({
        hours: 0,
        minutes: 0
    })
    const [timeInput, setTimeInput] = useState(0)
    const timeRef = useRef(null)

    useEffect(() => {
        setdashs(prevdashs => {
            return prevdashs.map((_, i) => {
                const containerStyle = { transform: `rotate(${i*30}deg)` }
                const dashStyle = i % 3 === 0 ? 'vertical-dash' : 'dot-dash'

                return (
                    <div 
                        key={i}
                        className="dash-container" 
                        style={containerStyle}
                    >
                        <div className={`dash ${dashStyle}`}></div>
                    </div>
                )
            })
        })
        changeTime()
    }, [])

    useEffect(() => {
        timeRef.current.focus()
    }, [clock])

    function changeTime() {
        const random = (max) =>  Math.floor(Math.random() * max)
        setClock({
            hours: random(12),
            minutes: random(60)
        })
    }

    function addTimer(n) {
        setSeconds(prev => {
            let newTimer = prev + n
            if (newTimer <= 0) newTimer = 0
            return newTimer
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const {hours, minutes} = clock
        const [nowHours, nowMinutes] = format(timeInput).split('h').map(h => Number(h))
        const actualAngle = ((nowHours * 30) + (nowMinutes / 60 * 30)) % 360
        const lastAngle = ((hours * 30) + (minutes / 60 * 30)) % 360
        const delta1 = Math.abs(actualAngle - lastAngle)
        const delta2 = 360 - delta1
        const minAngle = Math.min(delta1, delta2)
        const precision = 100 - (minAngle * 100 / 180)

        if (precision > 95) {
            addTimer(5)
        } else {
            addTimer(-2)
        }

        changeTime()
        setTimeInput(0)
    }

    function handleChange(event) {
        const {value} = event.target
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
    const clockStyle = animation === 'fall' ? {
        animationName: 'fall',
        animationDuration: '2s',
        animationFillMode: 'forwards',
    } : null

    return (
        <main>
            <div className="clock-container">
                {/* <span>{`${clock.hours}h${clock.minutes}min`}</span> */}
                <div className="clock" style={clockStyle}>
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
                        ref={timeRef}
                        className="time-input"
                        value={format(timeInput)}
                        onChange={handleChange}
                        autoFocus
                    />
                </form>
            </div>
        </main>
    )
}