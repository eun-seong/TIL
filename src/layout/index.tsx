import styled from '@emotion/styled';

import './reset.css';
import Header from '../components/Header';

const LayoutWrapper = styled.div`
  & > * {
    margin: 0 auto;
  }
`;

const Contents = styled.main`
  max-width: 52rem;
  padding: 1rem;
  margin-bottom: 2.4rem;
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <Contents>{children}</Contents>
    </LayoutWrapper>
  );
};

export default Layout;
