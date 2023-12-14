import React, { useState } from "react"

import Game from "./Game"
import Menu from "./Menu"

export default function App() {
    const [gameState, setGameState] = useState('menu')
    const [formData, setFormData] = useState({
        difficult: 'medium',
        zen: false,
    })

    const placeLayout = () => {
        if (gameState === 'menu') {
            return (
                <Menu 
                    setGameState={setGameState}
                    formData={formData}
                    setFormData={setFormData}
                />
            )
        } if (gameState === 'game') {
            return (
                <Game 
                    setGameState={setGameState}
                    isZen={formData.zen}
                />
            )
        }
    }

    return (
        <>
            {placeLayout()}
        </>
    )
}