import React from 'react';
import styled from 'styled-components';

import { SvgIconProps } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import CreateIcon from '@material-ui/icons/Create';

const instagramIcon: React.ReactElement<SvgIconProps> = <InstagramIcon fontSize='small' />;
const gitHubIcon: React.ReactElement<SvgIconProps> = <GitHubIcon fontSize='small' />;
const emailIcon: React.ReactElement<SvgIconProps> = <EmailIcon fontSize='small' />;
const createIcon: React.ReactElement<SvgIconProps> = <CreateIcon fontSize='small' />;

const Container = styled.footer`
  margin-top: auto;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 48rem;
  padding: 1rem;
`;

const Icons = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-between;
  align-items: center;
`;

const Link = styled.a`
  color: #fff;
`;

const Footer: React.FC<{}> = () => {
  return (
    <Container>
      <Wrapper>
        <div>© {new Date().getFullYear()}, dev_eun</div>
        <Icons>
          <Link href='https://github.com/eun-seong'>{gitHubIcon}</Link>
          <Link href='mailto:eunseongofficial@gmail.com'>{emailIcon}</Link>
          <Link href='https://programmer-eun.tistory.com/'>{createIcon}</Link>
          <Link href='https://instagram.com/eeun_seong'>{instagramIcon}</Link>
        </Icons>
      </Wrapper>
    </Container>
  );
};

export default Footer;
