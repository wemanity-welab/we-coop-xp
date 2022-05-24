import React, { useEffect, useState } from 'react';
import { missionServices } from 'application';
import { Mission } from 'domain/mission/mission';
import { useMission } from '../../hooks/UseMissions';
import { missionList } from '../../store/Mission/mission.actions';
import { ListingCards } from 'infrastructure/view/components';

export const Missions = ({ setDisplay, setMission }) => {
  const { state, dispatch } = useMission();
  const [catalog, setCatalog] = useState<Mission[]>([]);
  const [status, setStatus] = useState<boolean>();
  const [position, setPosition] = useState({ xPos: 0, yPos: 0 });
  const [idList, setIdList] = useState<any>([]);
  const [idMenuList, setIdMenuList] = useState<any>([]);

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
      const newList = idList.push(el);
      setIdList([newList, ...idList]);
    },
    removeId: (el: any) => {
      const newList = idList.splice(el, 1);
      setIdList([newList]);
    },
  };

  const contextMenu = {
    ids: idMenuList,
    addId: el => {
      idMenuList.push(el);
      setIdMenuList([...idMenuList]);
    },
    removeId: el => {
      const index = idMenuList.indexOf(el);
      idMenuList.splice(index, 1);
      setIdMenuList([...idMenuList]);
    },
    position: (e: React.MouseEvent) => {
      e.preventDefault();
      setPosition({ xPos: e.pageX, yPos: e.pageY - 80 });
    },
    changeStatus: async id => {
      const newStatus = { isActive: !status };
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
    missionServices
      .getMissions()
      .then(missions => dispatch(missionList(missions)));
  };

  return (
    <ListingCards
      setMission={setMission}
      title="Les Missions"
      cardType="mission"
      props={catalog}
      position={position}
      contextMenu={contextMenu}
      details={details}
      setDisplay={setDisplay}
    />
  );
};
