import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const proficiencyLevels = [
    {
        level: "A1",
        description: "You can understand and use basic phrases and expressions.  You can communicate in simple ways when people speak slowly to you."
    },
    {
        level: "A2",
        description: "You can take part in simple exchanges on familiar topics. You can understand and communicate routine information."
    },
    {
        level: "B1",
        description: "You can communicate in situations and use simple language to communicate feelings, opinions, plans and experiences."
    },
    {
        level: "B2",
        description: "You can communicate easily with native speakers. You can understand and express some complex ideas and topics."
    },
    {
        level: "C1",
        description: "You can understand and use a wide range of language. You can use English flexibly and effectively for social and academic purposed."
    },
    {
        level: "C2",
        description: "You can understand almost everything you hear or read. You can communicate very fluently and precisely in complex situations."
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

const Button = styled.button`
  background-color: #256193;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1f4d68;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const SelectLevel = () => {
    const navigate = useNavigate();

    const [level, setLevel] = useState(proficiencyLevels[0]);

    const handleSliderChange = (event) => {
        const levelIndex = event.target.value;
        setLevel(proficiencyLevels[levelIndex]);
    };

    return (
        <div>
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
            <ButtonContainer>
                <Button onClick={() => navigate("/home")}>Next</Button>
            </ButtonContainer>
        </div>
    );
};

export default SelectLevel;
