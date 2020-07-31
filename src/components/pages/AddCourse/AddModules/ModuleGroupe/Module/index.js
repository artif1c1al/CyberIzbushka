import React, { useState, useEffect } from "react";
import Lectures from "./Lectures";
import Button from "components/Button";

import "./style.scss";
const { v4: uuidv4 } = require("uuid");

export default function Module({ onModuleChange, num }) {
    const [numOfLectures, setNumOfLectures] = useState(0);

    const [module, setModule] = useState({});

    const changeModule = (key, label) => {
        setModule({ ...module, [key]: label });
        onModuleChange(module, num);
    };

    useEffect(() => {
        if (numOfLectures <= 1) {
            setNumOfLectures(1);
        }
    }, [numOfLectures]);

    return (
        <div key={uuidv4()}>
            <div className="Module">
                <div>
                    <span>Имя модуля:</span>
                    <input
                        type="text"
                        name="name"
                        value={module.name}
                        onChange={({ target }) => {
                            changeModule("name", target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Продолжительность:</span>
                    <input
                        id="duration"
                        type="text"
                        name="duration"
                        value={module.duration}
                        onChange={({ target, ...e }) => {
                            changeModule("duration", target.value);
                        }}
                    />
                </div>

                <Button
                    label="Добавить видео"
                    bgc="#00587a"
                    onClick={() => setNumOfLectures(numOfLectures + 1)}
                />
                <Button
                    label="Убрать видео"
                    bgc="#803100"
                    onClick={() => setNumOfLectures(numOfLectures - 1)}
                />
            </div>
            <Lectures n={numOfLectures} changeModule={changeModule} />
        </div>
    );
}
