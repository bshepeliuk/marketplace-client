import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { CategoriesButton, Wrap } from './dropDown.styled';
import DropDownList from './DropDownList';

function CategoriesDropDown() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleShow = () => setIsVisible((prevIsShow) => !prevIsShow);
  const onLeave = () => setIsVisible(false);

  useEffect(() => {
    onLeave();
  }, [location]);

  return (
    <Wrap>
      <CategoriesButton type="button" onClick={toggleShow}>
        <BsFillGrid3X3GapFill size="22" />
        Categories
      </CategoriesButton>
      {isVisible && <DropDownList onLeave={onLeave} />}
    </Wrap>
  );
}

export default CategoriesDropDown;
