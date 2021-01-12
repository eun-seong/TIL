import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.header`
  z-index: 1;
  position: sticky;
  top: 0;
  background: rebeccapurple;
  margin-bottom: calc(1.45rem + 20px);
`;

const HeaderBar = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 960px;
  padding: 1.2rem 1.0875rem;
`;

const SLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 0.6rem;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.6;
  }
`;

const Menu = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

interface IProps {
  siteTitle: string;
}

const Header: React.FC<IProps> = ({ siteTitle }) => (
  <HeaderDiv>
    <HeaderBar>
      <SLink to='/'>{siteTitle}</SLink>
      <Menu>
        <SLink to='/posts'>Posts</SLink>
        <SLink to='/about'>About</SLink>
      </Menu>
    </HeaderBar>
  </HeaderDiv>
);

export default Header;
