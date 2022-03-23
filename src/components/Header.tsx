import styled from '@emotion/styled';

const Header = () => {
  return (
    <HeaderContainer>
      <Title>{process.env.GATSBY_AUTHOR}</Title>
      <Menus>
        <ul>
          <a>topics</a>
        </ul>
        <ul>
          <a>study</a>
        </ul>
      </Menus>
    </HeaderContainer>
  );
};

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

const Menus = styled.li`
  list-style-type: none;
  ul {
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 600;
    padding-left: 1rem;
    float: left;
  }
`;

export default Header;
