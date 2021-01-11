import React from 'react';
import styled from 'styled-components';
import PropTypes, { ReactNodeLike } from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 48rem;
  padding: 1rem;
`;

interface IProps {
  children: ReactNodeLike;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Wrapper>
        <main>{children}</main>
      </Wrapper>
      <footer>
        <Wrapper>© {new Date().getFullYear()}, dev_eun</Wrapper>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
