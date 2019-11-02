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
  width: ${props => `${props.amount()}%`};
  height: 100%;
  background: #05da8e;
`;
const Cons = styled.span`
  display: block;
  height: 100%;
  width: ${props => `${props.amount()}%`};
  background: #d01c54;
`;
const getPercentage = (amount, total) => {
  const percent = amount && total && Math.floor((amount / total) * 100);
  return percent;
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
