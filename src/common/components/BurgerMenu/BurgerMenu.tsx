import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaBalanceScale } from 'react-icons/fa';
import useSetBodyScroll from '@src/common/hooks/useBodyScroll';
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
import { BsBox } from 'react-icons/bs';

function BurgerMenu() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isBuyer, isSeller } = useCheckUserRole();
  const setHasBodyScroll = useSetBodyScroll();

  const onOpen = () => {
    setIsOpen(true);
    setHasBodyScroll(false);
  };
  const onClose = () => {
    setIsOpen(false);
    setHasBodyScroll(true);
  };

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

          {isSeller && (
            <MenuLink to={routes.orders}>
              <BsBox />
              My orders
            </MenuLink>
          )}
          {isBuyer && (
            <MenuLink to={routes.purchases}>
              <BsBox />
              My purchases
            </MenuLink>
          )}

          <MenuLink to={routes.comparison}>
            <FaBalanceScale />
            comparison
          </MenuLink>
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
