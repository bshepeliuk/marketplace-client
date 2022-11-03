import useMountTransition from '@src/common/hooks/useMountTransition';
import React, { useEffect, useRef } from 'react';
import { CloseIcon, Layout, SideBarContainer, SideBarContent } from './sidebar.styled';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  width: number;
  children: React.ReactNode;
  color?: string;
}

function SideBarView(props: IProps) {
  const { onClose, isOpen, children, color = '#34495e' } = props;

  const sideBarRef = useRef<HTMLDivElement>(null);
  const hasTransitionedIn = useMountTransition({ isMounted: isOpen, unmountDelay: 300 });

  const onMouseDown = (evt: MouseEvent) => {
    if (sideBarRef.current === null) return;

    const target = evt.target as HTMLElement;
    const hasClickedOutside = !sideBarRef.current.contains(target);

    if (hasClickedOutside) onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', onMouseDown);
    }

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [isOpen]);

  return isOpen || hasTransitionedIn ? (
    <Layout>
      <SideBarContainer ref={sideBarRef} isOpen={isOpen && hasTransitionedIn} color={color}>
        <CloseIcon onClick={onClose} color="#fff" />
        <SideBarContent>{children}</SideBarContent>
      </SideBarContainer>
    </Layout>
  ) : null;
}

export default SideBarView;
