import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage: React.FC = () => (
  <Layout pageTitle={'Home'}>
    <SEO title='Home' />
    hello
  </Layout>
);

export default IndexPage;
