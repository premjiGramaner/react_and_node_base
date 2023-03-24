import React, { createContext, useState } from "react";

export const ThemeColors = {
    primary: "brown",
    blue: "blue",
    red: "red",
    purple: "purple",
    orange: "orange",
    green: "green"
};

export const ThemeColorContext = createContext({
    color: ThemeColors.blue
});

export const ThemeColorWrapper = (props) => {
    const { Component } = props;
    const [color, setColor] = useState(ThemeColors.blue);
    const changeColor = (color: string) => {
        setColor(color);
    }

    return (
        <ThemeColorContext.Provider value={{ color: color }}>
            <Component changeColor={changeColor} color={color} />
        </ThemeColorContext.Provider>);
}