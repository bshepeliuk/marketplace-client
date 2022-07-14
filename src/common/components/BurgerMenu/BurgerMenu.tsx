import React, { useState } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import BurgerButton from './components/BurgerButton';
import SideBarView from './components/SideBarView';

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useTypedSelector((state) => state.auth);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <BurgerButton onOpen={onOpen} size={30} color="#fff" />

      <SideBarView width={350} isOpen={isOpen} onClose={onClose}>
        <h1>{user?.fullName}</h1>
        <p>{user?.email}</p>
        <p>{user?.role}</p>
      </SideBarView>
    </>
  );
}

export default BurgerMenu;
