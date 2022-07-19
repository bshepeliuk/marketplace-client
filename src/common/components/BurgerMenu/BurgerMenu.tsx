import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import SearchBarView from '@features/search/components/SearchBar/SearchBar';
import { routes } from '@src/app/Router';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import useCheckUserRole from '@common/hooks/useCheckUserRole';
import BurgerButton from './components/BurgerButton';
import SideBarView from './components/SideBarView';
import CategoryLinks from './components/CategoryLinks/CategoryLinks';
import UserBlockView from './components/UserBlock/UserBlockView';
import {
  CategoriesContainer,
  DividingLine,
  MainLinksContainer,
  MenuLink,
  MenuTitle,
  SearchContainer,
} from './burgerMenu.styled';

function BurgerMenu() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isBuyer, isSeller } = useCheckUserRole();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    onClose();
  }, [location]);

  return (
    <>
      <BurgerButton onOpen={onOpen} size={30} color="#fff" />

      <SideBarView width={350} isOpen={isOpen} onClose={onClose}>
        <UserBlockView />
        <SearchContainer>
          <SearchBarView />
        </SearchContainer>

        <MenuTitle>main</MenuTitle>
        <DividingLine />
        <MainLinksContainer>
          <MenuLink to={routes.account}>
            <VscAccount />
            account
          </MenuLink>
          {isBuyer && (
            <MenuLink to={routes.cart}>
              <AiOutlineShoppingCart />
              my cart
            </MenuLink>
          )}

          {isSeller && (
            <MenuLink to={routes.newDevice}>
              <MdOutlineLibraryAdd />
              create a new device
            </MenuLink>
          )}
        </MainLinksContainer>

        <MenuTitle>categories</MenuTitle>
        <DividingLine />
        <CategoriesContainer>
          <CategoryLinks />
        </CategoriesContainer>
      </SideBarView>
    </>
  );
}

export default BurgerMenu;
