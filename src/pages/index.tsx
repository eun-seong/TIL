import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../graphql-types';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexQuery = graphql`
  query HomeQuery {
    allMarkdownRemark(filter: { frontmatter: { title: { eq: "home" } } }) {
      edges {
        node {
          frontmatter {
            path
            title
            template
          }
          html
          id
        }
      }
    }
  }
`;

const IndexPage: React.FC = () => {
  const data = useStaticQuery<Query>(IndexQuery);
  const contents = data.allMarkdownRemark.edges[0].node.html;

  return (
    <Layout pageTitle={'dev_eun'}>
      <SEO title='Home' />
      <div dangerouslySetInnerHTML={{ __html: contents }} />
    </Layout>
  );
};
export default IndexPage;
