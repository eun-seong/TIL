import React from 'react';
import styled from 'styled-components';
import PropTypes, { ReactNodeLike } from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Footer from './Footer';
import Header from './Header';
import Divider from './Divider';
import { mainColor } from '../const';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  text-justify: center;
  font-size: 1.6rem;
  margin-bottom: 1.45rem;
`;

const PostTitle = styled.h1`
  color: ${mainColor};
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.45rem;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 48rem;
  padding: 1rem;
`;

interface IProps {
  children: ReactNodeLike;
  pageTitle: string;
  isPost?: boolean;
}

const Layout: React.FC<IProps> = ({ children, pageTitle, isPost }) => {
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
    <Wrapper>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      {isPost ? <PostTitle>{pageTitle}</PostTitle> : <Title>{pageTitle}</Title>}
      <Main>
        <Divider />
        {children}
      </Main>
      <Footer />
    </Wrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
