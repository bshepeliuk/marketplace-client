import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRegImages } from 'react-icons/fa';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';

import { BiCategoryAlt, BiDevices, BiBookAlt } from 'react-icons/bi';
import styled from 'styled-components';
import { newDeviceRoutes } from '../pages/NewDeviceView';

const Circle = styled.div<{ isActive: boolean }>`
  height: 70px;
  width: 70px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  color: #fff;
  font-weight: bold;
  transition: all 0.6s ease-in;
  font-size: 25px;

  color: ${(props) => (props.isActive ? '#1abc9c;' : '#bdc3c7;')};

  border: ${(props) =>
    props.isActive ? '5px solid #1abc9c;' : '5px solid #bdc3c7;'};
`;

const Wrap = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-between;
  margin-bottom: 50px;
  position: relative;
`;

const ProgressLine = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}%`};
  background-color: #1abc9c;
  position: absolute;
  height: 8px;
  z-index: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: all 1s ease-out;
`;

const Title = styled.h4<{ isActive: boolean }>`
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  margin-top: 10px;
  color: ${(props) => (props.isActive ? '#1abc9c;' : '#bdc3c7;')};
  transition: all 0.4s ease-out;
`;

const InnerWrap = styled.div`
  position: relative;
`;

const BADGE_TITLES = ['brand', 'category', 'base info', 'features', 'images'];

const icons = [
  BiCategoryAlt,
  BiBookAlt,
  BiDevices,
  MdOutlineFeaturedPlayList,
  FaRegImages,
];

const initialSteps = Array(5)
  .fill(undefined)
  .map((_, idx) => ({
    id: idx + 1,
    isActive: false,
    title: BADGE_TITLES[idx],
    icon: icons[idx],
  }));

const MAX_WIDTH_IN_PERCENT = 100;

function StepIndicatorList() {
  const location = useLocation();
  const [width, setWidth] = useState(0);
  const [counter, setCounter] = useState(1);
  const [steps, setSteps] = useState(initialSteps);

  const ONE_STEP_WIDTH = MAX_WIDTH_IN_PERCENT / (initialSteps.length - 1);

  const STEP_PATHNAME = {
    [newDeviceRoutes.brand]: 1,
    [newDeviceRoutes.category]: 2,
    [newDeviceRoutes.info]: 3,
    [newDeviceRoutes.details]: 4,
    [newDeviceRoutes.images]: 5,
  };

  useEffect(() => {
    // TODO: refactoring
    setSteps((prev) =>
      prev.map((item) => {
        if (item.id === counter && !item.isActive) {
          return {
            ...item,
            isActive: true,
          };
        }

        return { ...item, isActive: false };
      }),
    );
  }, [counter]);

  const FIRST_STEP_PROGRESS_WIDTH = 25;

  useEffect(() => {
    setCounter(STEP_PATHNAME[location.pathname]);
    // prettier-ignore
    const CURRENT_PROGRESS_WIDTH = ONE_STEP_WIDTH * STEP_PATHNAME[location.pathname];
    // prettier-ignore
    const NEXT_PROGRESS_WIDTH = CURRENT_PROGRESS_WIDTH - FIRST_STEP_PROGRESS_WIDTH;

    setWidth(NEXT_PROGRESS_WIDTH);
  }, [location.pathname]);

  return (
    <Wrap>
      <ProgressLine width={width} />

      {steps.map((item) => {
        const Icon = item.icon;

        return (
          <InnerWrap key={item.id}>
            <Circle isActive={item.isActive}>
              <Icon />
            </Circle>
            <Title isActive={item.isActive}>{item.title}</Title>
          </InnerWrap>
        );
      })}
    </Wrap>
  );
}

export default StepIndicatorList;
