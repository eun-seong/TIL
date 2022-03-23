import { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import { COLLECTIONS } from '@src/constants';
import env from '@src/config/env';

const Header = () => {
  const [isCollectionEnable, setCollectionEnable] = useState(false);
  const {
    allDirectory: { edges },
  } = useStaticQuery(graphql`
    query {
      allDirectory(filter: { sourceInstanceName: { eq: "contents" }, relativeDirectory: { eq: "" } }) {
        edges {
          node {
            relativePath
            relativeDirectory
            id
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (edges.filter(({ node }) => node.relativePath === COLLECTIONS)) {
      setCollectionEnable(true);
    }
  }, [edges]);

  return (
    <HeaderContainer>
      <Title>{env.GATSBY_AUTHOR}</Title>
      <Menus>
        {edges
          .filter(({ node }) => node.relativePath !== COLLECTIONS)
          .map(({ node }) => (
            <ul key={node.id}>
              <a>{node.relativePath}</a>
            </ul>
          ))}
        {isCollectionEnable && (
          <ul key={COLLECTIONS}>
            <a>{COLLECTIONS}</a>
          </ul>
        )}
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
