import styled from '@emotion/styled';

interface TextOption {
  readonly f40?: boolean;
  readonly f32?: boolean;
  readonly f28?: boolean;
  readonly f24?: boolean;
  readonly f20?: boolean;
  readonly f18?: boolean;
  readonly f16?: boolean;
  readonly f15?: boolean;
  readonly f14?: boolean;
  readonly f12?: boolean;
  readonly f10?: boolean;
  readonly f8?: boolean;

  readonly light?: boolean;
  readonly medium?: boolean;
  readonly bold?: boolean;

  readonly center?: boolean;
  readonly right?: boolean;

  readonly nowrap?: boolean;
  readonly pre?: boolean;

  readonly noCursor?: boolean;
}

const textOption = (props: TextOption) => {
  const getFontSize = () => {
    if (props.f40) return '40px';
    if (props.f32) return '32px';
    if (props.f28) return '28px';
    if (props.f24) return '24px';
    if (props.f20) return '20px';
    if (props.f18) return '18px';
    if (props.f16) return '16px';
    if (props.f15) return '15px';
    if (props.f14) return '14px';
    if (props.f12) return '12px';
    if (props.f10) return '10px';
    if (props.f8) return '8px';
    return '14px';
  };
  const getFontWeight = () => {
    if (props.light) return '300';
    if (props.medium) return '500';
    if (props.bold) return '600';
    return '400';
  };
  const getTextAlign = () => {
    if (props.center) return 'center';
    if (props.right) return 'right';
    return 'left';
  };
  const getWhiteSpace = () => {
    if (props.nowrap) return 'nowrap';
    if (props.pre) return 'pre-wrap';
    return 'normal';
  };
  return `
    font-size: ${getFontSize()};
    font-weight: ${getFontWeight()};
    text-align: ${getTextAlign()};
    white-space: ${getWhiteSpace()};
    word-break: break-word;
  `;
};

export const H = styled.h1<TextOption>`
  ${(props) => textOption(props)}
  font-weight: 700;
`;
export const P = styled.p<TextOption>`
  ${(props) => textOption(props)}
`;
