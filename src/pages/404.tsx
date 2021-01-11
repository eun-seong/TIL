import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title='404: Not found' />
    <h1>404: Not Found</h1>
  </Layout>
);

export default NotFoundPage;
