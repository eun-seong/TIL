import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../graphql-types';

import PostCard from '../components/PostCard';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const LatestPostListQuery = graphql`
  query PostQuery {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            template
            date(formatString: "YYYY-MM-DD HH:mm:ss")
          }
          html
          excerpt(pruneLength: 200, truncate: true)
          id
        }
      }
    }
  }
`;

const PostsPage: React.FC = () => {
  const data = useStaticQuery<Query>(LatestPostListQuery);

  return (
    <Layout pageTitle={'게시글 목록'}>
      <SEO title='Posts' />
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

export default PostsPage;
