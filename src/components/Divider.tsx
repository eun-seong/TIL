import React from 'react';
import styled from 'styled-components';

const color = '#ddd';

const Container = styled.div`
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Line = styled.span`
  position: relative;
  top: 20px;
  width: 30%;
  height: 1px;
  background: ${color};
`;

const Diamond = styled.span`
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: ${color};
  position: relative;
  top: 0px;
  &:after {
    content: '';
    position: absolute;
    left: -10px;
    top: 10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: ${color};
  }
`;

const SubDiamond = styled.span`
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom-color: #fff;
  position: relative;
  top: -16px;
  &:after {
    content: '';
    position: absolute;
    left: -8px;
    top: 8px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: #fff;
  }
`;

const Divider: React.FC<{}> = ({}) => {
  return (
    <Container>
      <Line />
      <Diamond />
      <SubDiamond />
    </Container>
  );
};

export default Divider;
