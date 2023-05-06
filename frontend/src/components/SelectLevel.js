import React, { useState } from "react";
import styled from "styled-components";

const proficiencyLevels = [
    {
        level: "A1",
        description: "Description for A1 level goes here"
    },
    {
        level: "A2",
        description: "Description for A2 level goes here"
    },
    {
        level: "B1",
        description: "Description for B1 level goes here"
    },
    {
        level: "B2",
        description: "Description for B2 level goes here"
    },
    {
        level: "C1",
        description: "Description for C1 level goes here"
    },
    {
        level: "C2",
        description: "Description for C2 level goes here"
    }
];

const SelectLevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LevelHeader = styled.h1`
  font-size: 48px;
  font-weight: bold;
`;

const LevelDescription = styled.p`
  font-size: 24px;
  margin: 0 0 32px 0;
`;

const StepSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background-color: #eee;
  outline: none;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 32px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    background-color: #256193;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background-color: #256193;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Label = styled.span`
  font-size: 18px;
`;

const SelectLevel = () => {
    const [level, setLevel] = useState(proficiencyLevels[0]);

    const handleSliderChange = (event) => {
        const levelIndex = event.target.value;
        setLevel(proficiencyLevels[levelIndex]);
    };

    return (
        <SelectLevelContainer>
            <LevelHeader>{level.level}</LevelHeader>
            <LevelDescription>{level.description}</LevelDescription>
            <StepSlider
                type="range"
                min="0"
                max={proficiencyLevels.length - 1}
                value={proficiencyLevels.indexOf(level)}
                onChange={handleSliderChange}
            />
            <LabelContainer>
                <Label>Beginner</Label>
                <Label>Fluent</Label>
            </LabelContainer>
        </SelectLevelContainer>
    );
};

export default SelectLevel;
