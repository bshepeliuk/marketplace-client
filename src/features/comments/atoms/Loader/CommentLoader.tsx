import React from 'react';
import { IContentLoaderProps } from 'react-content-loader';
import styled from 'styled-components';
import BaseLoader from './components/BaseLoader';
import LoaderForMobiles from './components/LoaderForMobiles';

function CommentLoader(props: IContentLoaderProps) {
  return (
    <>
      <LargeScreenWrap>
        <BaseLoader props={props} />
      </LargeScreenWrap>

      <SmallScreenWrap>
        <LoaderForMobiles props={props} />
      </SmallScreenWrap>
    </>
  );
}

const SmallScreenWrap = styled.div`
  display: none;

  @media (max-width: 576px) {
    display: block;
  }
`;

const LargeScreenWrap = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`;

export default CommentLoader;
