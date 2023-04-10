import React, { useState } from "react"

import Tilty from "react-tilty"

import FadeIn from "../components/FadeIn"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons"

import { getAll, getFromSubject } from "../scripts/data"

const ExplorePage = () => {
    const [selectedDiscipline, setSelectedDiscipline] = useState(null)

    const inactiveClasses = "query-option content-font small-text"
    const activeClasses = "query-option content-font small-text active"

    const disciplines = [
        "all",
        "art",
        "mathematics",
        "music",
        "science",
        "philosophy",
        "literature"
    ]
    const queryRenders = []
    disciplines.forEach((discipline, index) => {
        queryRenders.push(
            <FadeIn key={index} delay={`${(100 * (Math.abs(0.5 * disciplines.length - index) + 12))}ms`}>
                <div className={selectedDiscipline == discipline ? activeClasses : inactiveClasses} onClick={() => setSelectedDiscipline(discipline)}>
                    {
                        discipline.slice(0, 1).toUpperCase() + discipline.slice(1)
                    }
                </div>
            </FadeIn>
        )
    })
    
    const people = selectedDiscipline == null ? [] : selectedDiscipline == "all" ? getAll() : getFromSubject(selectedDiscipline)

    const peopleRenders = []
    people.forEach(({ id, name }, index) => {
        peopleRenders.push(
            <FadeIn key={name + "-" + selectedDiscipline}>
                <Tilty reverse max={15} className={"person-container"} style={{ backgroundImage: `url(/assets/images/people/${id}.jpg)` }}>
                    <a href={`/#/bio/${id}`} target={"_blank"} style={{ display: "block", width: "100%", height: "100%" }}>
                        <div className={"person-name content-font small-text"}>
                            {
                                name
                            }
                        </div>
                    </a>
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
            {
                selectedDiscipline != null && (
                    <React.Fragment>
                        <FadeIn threshold={1.0}>
                            <hr />
                        </FadeIn>
                        <FadeIn threshold={1.0} delay={"200ms"} className={"footer-container"}>
                            <div style={{ paddingRight: "20px" }} className={"content-font small-text"}>© 2023 Matthew Perlman</div>
                            <div>
                                <a href={"mailto:mattperls.code@gmail.com"} className={"icon"}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </a>
                                <a href={"https://github.com/mattperls-code"} className={"icon"}>
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                                <a href={"https://www.instagram.com/mattperls-code"} className={"icon"}>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>
                        </FadeIn>
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default ExplorePage