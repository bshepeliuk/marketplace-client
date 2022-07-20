import React from 'react';
import styled from 'styled-components';
import ErrorMessageView from '../common/components/ErrorMessageView';

interface IProps {
  children: React.ReactNode;
}

interface IState {
  hasError: boolean;
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  height: 100vh;
  color: #34495e;
`;

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  onReload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrap>
          <ErrorMessageView />

          <button type="button" onClick={this.onReload}>
            reload
          </button>
        </Wrap>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
