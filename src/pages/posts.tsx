import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../graphql-types';

import PostList from '../components/PostList';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const LatestPostListQuery = graphql`
  query PostQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      group(field: frontmatter___category, limit: 10) {
        edges {
          node {
            frontmatter {
              title
              path
            }
          }
        }
        fieldValue
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
        {data.allMarkdownRemark.group.map(({ edges, fieldValue }, id) => (
          <PostList edges={edges} fieldValue={fieldValue} key={id} />
        ))}
      </Ul>
    </Layout>
  );
};

export default PostsPage;
