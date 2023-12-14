import React, {useState} from "react"

import GitHub from './svg/Github'
import Info from "./svg/Info"

export default function Menu(props) {
    const {
        setGameState,
        formData,
        setFormData,
    } = props

    const [infoVisible, setInfoVisible] = useState(false)
    const [howToPlay, setHowToPlay] = useState(false)

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target || event

        setFormData((prevFormData) => (
            { 
                ...prevFormData, 
                [name]: type === 'checkbox' ? checked : value 
            }
        ))
    }
  
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    function keyDown(e) {
        if (e.key !== 'Enter') return
        const label = e.target
        const name = label.dataset.inputName
        const value = label.htmlFor
        
        const newData = {
            name,
            value: value === 'zen' ? !formData.zen : value
        }

        console.log(newData)
        
        handleChange(newData)
        
    }

    function showInfo() {
        setInfoVisible(prevInfoVisible => !prevInfoVisible)
    }

    return (
        <>
            {howToPlay && (
                <div className="how2play-popup"></div>
            )}
            <main className="main-menu">
                <header className="header-menu">
                    {/* <h2>Can you run through all mazes?</h2> */}
                </header>
                <section className="section-menu">
                    <form onSubmit={handleSubmit}>
                        <div className="option-wrapper">
                            <h3>Difficult</h3>
                                <div className="bttns-wrapper">
                                    <input 
                                        type="radio" 
                                        className="difficult-radio" 
                                        name="difficult" 
                                        id="easy" 
                                        value="easy"
                                        checked={formData.difficult === 'easy'}
                                        onChange={handleChange}
                                    />
                                    <input 
                                        type="radio" 
                                        className="difficult-radio" 
                                        name="difficult" 
                                        id="medium" 
                                        value="medium"
                                        checked={formData.difficult === 'medium'}
                                        onChange={handleChange}
                                    />
                                    <input 
                                        type="radio" 
                                        className="difficult-radio" 
                                        name="difficult" 
                                        id="hard" 
                                        value="hard"
                                        checked={formData.difficult === 'hard'}
                                        onChange={handleChange}
                                    />
                                
                                    <button className={`bttn ${formData.difficult === 'easy' ? 'active' : ''}`} onKeyUp={keyDown}>
                                        <label className="difficult-label" htmlFor="easy">Easy</label>
                                    </button>
                                    <button className={`bttn ${formData.difficult === 'medium' ? 'active' : ''}`} onKeyUp={keyDown}>
                                        <label className="difficult-label" htmlFor="medium">Medium</label>
                                    </button>
                                    <button className={`bttn ${formData.difficult === 'hard' ? 'active' : ''}`} onKeyUp={keyDown}>
                                        <label className="difficult-label" htmlFor="hard">Hard</label>
                                    </button>
                                </div>
                        </div>
                        <div className="option-wrapper">
                            <h3>Zen Mode</h3>
                            <div className="switch-wrapper">
                                <input
                                    type="checkbox"
                                    className="zen-checkbox"
                                    name="zen"
                                    id="zen"
                                    checked={formData.zen}
                                    onChange={handleChange}
                                />
                                <label className="switch switch-label" onKeyDown={keyDown} tabIndex="0" data-input-name="zen" htmlFor="zen">
                                    <div className={`switch-ball ${formData.zen ? 'active' : ''}`} />
                                </label>
                                <div className="info-wrapper">
                                    <Info
                                        className="icon-small"
                                        onClick={showInfo}
                                    />
                                    <div className="info-container" style={{
                                        opacity: infoVisible ? '1' : '0',
                                    }}>
                                        <span>Toogle timer <strong>on</strong> or <strong>off.</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <button
                        className="bttn bttn-plus"
                        onClick={() => setGameState('game')}
                    >
                        Start game
                    </button>
                </section>
            </main>
            <footer className="footer-menu">
                <a href="https://github.com/ccostafrias" target="_blank">
                    <GitHub className="icon-big"/>
                </a>
                <div
                    tabIndex='0'
                    onClick={() => setHowToPlay(prevHowToPlay => !prevHowToPlay)}
                    className="h2p-icon"
                >
                </div>
            </footer>
        </>
    )
}