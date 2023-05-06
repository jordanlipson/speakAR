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
  color: #fff;
  width: 100%;
`;

const LevelHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
  width: 330px;
  text-align: center;
  margin-top: 145px;
`;

const LevelTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  padding-top: 30px;
`;

const LevelDescription = styled.p`
  font-size: 18px;
  margin: 0 auto 32px auto;
  width: 330px;
  text-align: center;
  padding-top: 10px;
`;

const StepSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 335px;
  height: 8px;
  background-color: #4E4660;
  outline: none;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 500px; 
  position: fixed; 
  // bottom: 20px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 33px;
    height: 33px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    position: relative;
    top: 0px;
    z-index: 3;
  }
  &::-moz-range-thumb {
    width: 33px;
    height: 33px;
    background-color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    position: relative;
    top: 0px;
    z-index: 3;
  }
  &::-webkit-slider-runnable-track {
    background: linear-gradient(to right, #78B1F3 0%, #78B1F3 ${(props) => (props.value / (proficiencyLevels.length - 1)) * 100}%, #4E4660 ${(props) => (props.value / (proficiencyLevels.length - 1)) * 100}%, #4E4660 100%);
    border-radius: 16px;
  }
  &::-moz-range-track {
    background: linear-gradient(to right, #78B1F3 0%, #78B1F3 ${(props) => (props.value / (proficiencyLevels.length - 1)) * 100}%, #4E4660 ${(props) => (props.value / (proficiencyLevels.length - 1)) * 100}%, #4E4660 100%);
    border-radius: 16px;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 550px;
  margin-top: 530px;
  position: fixed; 
`;

const Label = styled.span`
  font-size: 13px;
  width: 50%;
  text-align: center;
`;

const Button = styled.button`
  width: 150px;
  height: 40px;
  border: 2px solid white;
  border-radius: 38px;
  background: transparent;
  color: white;
  font-size: 15px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 180px;
  width: 100%;
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
        <LevelHeader>How would you describe your language skills?</LevelHeader>
        <LevelTitle>{level.level}</LevelTitle>
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
        <Button onClick={() => navigate("/home")}>NEXT</Button>
      </ButtonContainer>
    </div>
  );
};

export default SelectLevel;
