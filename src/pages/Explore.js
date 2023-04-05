import React, { useState } from "react"

import Tilty from "react-tilty"

import FadeIn from "../components/FadeIn"

const ExplorePage = () => {
    const [selectedDiscipline, setSelectedDiscipline] = useState(null)

    const inactiveClasses = "query-option content-font small-text"
    const activeClasses = "query-option content-font small-text active"

    const disciplines = [
        "All",
        "Art",
        "Mathematics",
        "Music",
        "Science",
        "Philosophy",
        "Literature"
    ]
    const queryRenders = []
    disciplines.forEach((discipline, index) => {
        queryRenders.push(
            <FadeIn key={index} delay={`${(100 * (Math.abs(0.5 * disciplines.length - index) + 12))}ms`}>
                <div className={selectedDiscipline == discipline ? activeClasses : inactiveClasses} onClick={() => setSelectedDiscipline(discipline)}>
                    {
                        discipline
                    }
                </div>
            </FadeIn>
        )
    })

    const people = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h"
    ]
    const peopleRenders = []
    people.forEach((person, index) => {
        peopleRenders.push(
            <FadeIn key={index}>
                <Tilty reverse max={15} className={"person-container"}>
                    {
                        person
                    }
                </Tilty>
            </FadeIn>
        )
    })

    return (
        <div style={{ width: "100vw", height: "100vh", overflowY: "scroll" }}>
            <FadeIn delay={"800ms"} className={"prompt-container"}>
                <div className={"prompt-text header-font medium-text"}>Explore A Discipline</div>
            </FadeIn>
            <div className={"query-selector-container"}>
                {
                    queryRenders
                }
            </div>
            <FadeIn delay={"1750ms"}>
                <hr />
            </FadeIn>
            {
                selectedDiscipline == null ? (
                    <FadeIn delay={"2250ms"} className={"content-font action-label"}>Select A Topic Above</FadeIn>
                ) : (
                    <div className={"people-container"}>
                        {
                            peopleRenders
                        }
                    </div>
                )
            }
        </div>
    )
}

export default ExplorePage