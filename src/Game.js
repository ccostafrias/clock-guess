import React, { useState, useEffect } from "react"

import Clock from "./Clock"
import Countdown from "./Countdown"

export default function Game(props) {
    const {
        setLayout,
        isZen,
    } = props

    const [seconds, setSeconds] = useState(15)
    const [animation, setAnimation] = useState(null)

    return (
        <main className="main-game">
            {!isZen && (
                <Countdown 
                    seconds={seconds}
                    setSeconds={setSeconds}
                    setLayout={setLayout}
                    isRunning={true}
                    setAnimation={setAnimation}
                />
            )}
            <Clock 
                setSeconds={setSeconds}
                animation={animation}
            />
        </main>
    )
}