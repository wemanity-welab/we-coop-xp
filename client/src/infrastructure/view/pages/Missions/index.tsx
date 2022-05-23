import React, { useEffect, useState, useLayoutEffect } from 'react';
import { missionServices } from 'application';
import { Mission } from 'domain/mission/mission';
import { useMission } from '../../hooks/UseMissions';
import { missionList } from '../../store/Mission/mission.actions';
import { ListingCards } from 'infrastructure/view/components';

export const Missions = () => {
  const { state, dispatch } = useMission();
  const [catalog, setCatalog] = useState<Mission[]>([]);
  const [status, setStatus] = useState<boolean>();
  const [position, setPosition] = useState({ xPos: 0, yPos: 0 });
  const [idList, setIdList] = useState<any>([]);
  const [idMenuList, setIdMenuList] = useState<any>([]);
  const [scroll, setScroll] = useState<any>({ scrollx: 0, scrolly: 0 });

  useLayoutEffect(() => {
    window.scrollTo(scroll.scrollx, scroll.scrolly);
  });

  useEffect(() => {
    const missions: any = missionServices
      .getMissions()
      .then(data => dispatch(missionList(data)));
    setCatalog(missions);
  }, [status]);

  useEffect(() => {
    setCatalog(state.catalog);
  }, [state.catalog]);

  const details = {
    ids: idList,
    addId: (el: any) => {
      idList.push(el);
      setIdList([...idList]);
      setScroll({ scrollx: window.scrollX, scrolly: window.scrollY });
    },
    removeId: (el: any) => {
      setScroll({ scrollx: window.scrollX, scrolly: window.scrollY });
      const index = idList.indexOf(el);
      idList.splice(index, 1);
      setIdList([...idList]);
    },
  };

  const contextMenu = {
    ids: idMenuList,
    addId: el => {
      idMenuList.push(el);
      setIdMenuList([...idMenuList]);
      setScroll({ scrollx: window.scrollX, scrolly: window.scrollY });
    },
    removeId: el => {
      setScroll({ scrollx: window.scrollX, scrolly: window.scrollY });
      const index = idMenuList.indexOf(el);
      idMenuList.splice(index, 1);
      setIdMenuList([...idMenuList]);
    },
    position: (e: React.MouseEvent) => {
      e.preventDefault();
      setPosition({ xPos: e.pageX - 130, yPos: e.pageY + 10 });
    },
    changeStatus: async (id, propStatus) => {
      setScroll({ scrollx: window.scrollX, scrolly: window.scrollY });
      setStatus(propStatus);
      const newStatus = { isActive: !propStatus };
      await missionServices.updateMission(id, newStatus);
      setStatus(newStatus.isActive);
    },
    handleClickDelete: async id => {
      if (window.confirm('Êtes-vous sur de vouloir supprimer cette mission ?'))
        deleteMission(id);
      setIdMenuList([]);
    },
  };

  const deleteMission = async id => {
    const deletedMsg = await missionServices.deleteMission(id);
    console.log(deletedMsg);
    missionServices
      .getMissions()
      .then(missions => dispatch(missionList(missions)));
  };

  return (
    <ListingCards
      title="Les Missions"
      cardType="mission"
      props={catalog}
      position={position}
      contextMenu={contextMenu}
      details={details}
    />
  );
};
