import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { VscAccount } from 'react-icons/vsc';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import useLogout from '@features/auth/hooks/useLogout';
import useGetCategories from '@features/categories/hooks/useGetCategories';
import SearchBarView from '@features/search/components/SearchBar/SearchBar';
import styled from 'styled-components';
import { routes } from '@src/app/Router';
import { MdExitToApp, MdOutlineLibraryAdd } from 'react-icons/md';
import useCheckUserRole from '@common/hooks/useCheckUserRole';
import BurgerButton from './components/BurgerButton';
import SideBarView from './components/SideBarView';
import UserLogo from '../UserLogo/UserLogo';

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

function CategoryLinks() {
  const [params] = useSearchParams();
  const { items } = useGetCategories();

  const categoryId = Number(params.get('categoryId'));

  return (
    <CategoryList>
      {items.map((item) => {
        const isActive = categoryId === item.id;
        const className = isActive ? 'active-category' : '';

        return (
          <li key={item.id}>
            <CategoryLink
              className={className}
              to={{
                pathname: routes.devices,
                search: `?categoryId=${item.id}`,
              }}
            >
              {item.name}
            </CategoryLink>
          </li>
        );
      })}
    </CategoryList>
  );
}

function UserBlockView() {
  const { user } = useTypedSelector((state) => state.auth);
  const { onLogout } = useLogout();

  if (user === null) return null;

  return (
    <Wrap>
      <LogoWrap>
        <UserLogo fullName={user.fullName} size={70} />
      </LogoWrap>
      <FullName>{user.fullName}</FullName>
      <Email>{user.email}</Email>
      <Role>{user.role}</Role>
      <LogoutIcon onClick={onLogout} />
    </Wrap>
  );
}

const MainLinksContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding: 20px;
`;

const SearchContainer = styled.div`
  padding: 20px 10px;

  & .search-input {
    border-radius: 20px 0 0 20px;
  }

  & .search-button {
    border-radius: 0 20px 20px 0;
  }
`;

const CategoriesContainer = styled.div`
  padding: 20px;
`;

const CategoryList = styled.ul`
  display: flex;
  row-gap: 10px;
  flex-flow: column wrap;
`;

const CategoryLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-size: 18px;

  &:hover {
    color: #70a1ff;
  }

  & .active-category {
    color: #70a1ff;
  }
`;

const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  padding: 5px 0;
  font-size: 18px;
  display: grid;
  grid-template-columns: 30px 1fr;
  transition: transform 0.2 ease-in-out;

  &:hover {
    color: #70a1ff;
  }

  &.active svg {
    transform: scale(1.5);
  }

  &.active {
    color: #70a1ff;
  }
`;

const MenuTitle = styled.h1`
  margin: 0;
  padding-left: 15px;
  color: #1abc9c;
  font-weight: 500;
  font-size: 30px;
`;

const DividingLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #1abc9c;
  display: block;
`;

const LogoWrap = styled.div`
  grid-area: LOGO;
  justify-self: center;
  align-self: center;
`;

const Wrap = styled.div`
  display: grid;
  padding: 20px;
  grid-template-areas:
    'LOGO FULL-NAME LOGOUT'
    'LOGO EMAIL LOGOUT'
    'LOGO ROLE LOGOUT';
`;

const LogoutIcon = styled(MdExitToApp)`
  grid-area: LOGOUT;
  font-size: 20px;
  color: #fff;
  align-self: center;
  justify-self: end;
  cursor: pointer;
  grid-row: 1;
`;

const FullName = styled.h1`
  grid-area: FULL-NAME;
  margin: 0;
  font-size: 20px;
  text-transform: uppercase;
  color: #dfe4ea;
  align-self: end;
`;

const Email = styled.p`
  grid-area: EMAIL;
  margin: 0;
  color: #ced6e0;
`;

const Role = styled.p`
  grid-area: ROLE;
  margin: 0;
  color: #7f8fa6;
  align-self: end;
  font-weight: bold;
`;

export default BurgerMenu;
