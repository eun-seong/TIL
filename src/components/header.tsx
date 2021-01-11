import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

const Div = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 960px;
  padding: 1.2rem 1.0875rem;
`;

const SLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 0.6rem;
`;

const SiteTitle = styled.div`
  display: flex;
  width: 50%;
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
    <Div>
      <SLink to='/'>{siteTitle}</SLink>
      <Menu>
        <SLink to='/about'>About</SLink>
      </Menu>
    </Div>
  </HeaderDiv>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
