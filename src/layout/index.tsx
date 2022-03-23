import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';

import './reset.css';
import theme from '@src/styles/theme';
import Header from '@src/components/Header';

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
    <ThemeProvider theme={theme}>
      <LayoutWrapper>
        <Header />
        <Contents>{children}</Contents>
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default Layout;
