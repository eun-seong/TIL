import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../graphql-types';

import Layout from '../components/layout';
import SEO from '../components/seo';

const AboutQuery = graphql`
  query aboutQuery {
    allMarkdownRemark(filter: { frontmatter: { title: { eq: "About" } } }) {
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
  const data = useStaticQuery<Query>(AboutQuery);

  return (
    <Layout pageTitle={'About'}>
      <SEO title='About' />
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div dangerouslySetInnerHTML={{ __html: node.html }} />
      ))}
    </Layout>
  );
};
export default IndexPage;
