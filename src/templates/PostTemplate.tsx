import React from 'react';
import Layout from '../components/layout';
import Utterances from '../components/utterances';
import PostHeader from '../components/PostHeader';
import { ITemplateProps } from '../interface';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  title: string;
  date: string;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo((props) => {
  const { html } = props.pageContext;
  console.log(props);
  return (
    <Layout>
      <PostHeader {...props} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Utterances repo='eun-seong/TIL' />
    </Layout>
  );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;
