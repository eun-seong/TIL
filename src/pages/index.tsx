import React from 'react';
import styled from 'styled-components';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Query } from '../graphql-types';

import PostCard from '../components/PostCard';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Header = styled.div`
  display: flex;
  justify-content: center;
  text-justify: center;
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const LatestPostListQuery = graphql`
  query MyQuery {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
      edges {
        node {
          html
          excerpt(pruneLength: 200, truncate: true)
          frontmatter {
            path
            date(formatString: "YYYY-MM-DD HH:mm:ss")
            title
          }
          id
        }
      }
    }
  }
`;

const IndexPage: React.FC = () => {
  const data = useStaticQuery<Query>(LatestPostListQuery);

  return (
    <Layout>
      <SEO title='Home' />
      <Header>게시글 목록</Header>
      <Ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <>
            <PostCard node={node} />
            <hr />
          </>
        ))}
      </Ul>
    </Layout>
  );
};

export default IndexPage;
