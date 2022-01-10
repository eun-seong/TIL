import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  background-color: tomato;
  padding: 0 2rem;
`;

const Title = styled.div`
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 800;
`;

const Menu = styled.span`
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  padding-left: 1rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>{process.env.GATSBY_AUTHOR}</Title>
      <div>
        <Menu>topics</Menu>
        <Menu>study</Menu>
      </div>
    </HeaderContainer>
  );
};

export default Header;
