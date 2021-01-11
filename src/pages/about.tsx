import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Header = styled.div`
  display: flex;
  justify-content: center;
  text-justify: center;
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

const AboutPage: React.FC = () => (
  <Layout>
    <SEO title='About' />
    <Header>About</Header>
  </Layout>
);

export default AboutPage;
