import React from "react";
import styled from "styled-components";

const Percent = styled.section`
    background-color: #b5b5b5;
    width: 80%;
    height: 30px;
    margin: auto;
    border: 2px solid #737373;
    display: flex;
}`;
const Pro = styled.span`
  display: block;
  width: ${props => (props.amount() !== 0 ? `${props.amount()}%` : "%50")};
  height: 100%;
  background: green;
`;
const Cons = styled.span`
    display: block;
    height: 100%;
    width: ${props => (props.amount() !== 0 ? `${props.amount()}%` : "%50")}
    background: red;`;
const getPercentage = (amount, total) => {
  const percent = Math.floor((amount / total) * 100);
  console.log("percent", percent);
};
const PercentBar = props => {
  const { proAmount, conAmount } = props;
  const total = proAmount + conAmount;
  return (
    <Percent className="precent-container">
      <Pro amount={getPercentage.bind(this, proAmount, total)}></Pro>
      <Cons amount={getPercentage.bind(this, conAmount, total)}></Cons>
    </Percent>
  );
};
export default PercentBar;
