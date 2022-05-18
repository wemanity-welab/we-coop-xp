import React, { useEffect, useState } from 'react';
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
  // const [details, setDetails] = useState(false);

  useEffect(() => {
    const missions: any = missionServices
      .getMissions()
      .then(data => dispatch(missionList(data)));
    setCatalog(missions);
  }, [status]);

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
      const newList = idMenuList.push(el);
      setIdMenuList([newList, ...idMenuList]);
    },
    removeId: el => {
      const newList = idMenuList.splice(el, 1);
      setIdMenuList([newList]);
    },
    position: (e: React.MouseEvent) => {
      e.preventDefault();
      setPosition({ xPos: e.pageX, yPos: e.pageY - 80 });
    },
    setStatus: async id => {
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

  useEffect(() => {
    setCatalog(state.catalog);
  }, [state.catalog]);

  const deleteMission = async id => {
    const deletedMsg = await missionServices.deleteMission(id);
    console.log(deletedMsg);
    missionServices
      .getMissions()
      .then(missions => dispatch(missionList(missions)));
    setStatus(status);
  };

  return (
    <ListingCards
      title="Les Missions"
      props={catalog}
      position={position}
      contextMenu={contextMenu}
      details={details}
    />
  );
};
