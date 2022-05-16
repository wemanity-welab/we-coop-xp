import React, { useEffect, useState } from 'react';
import { missionServices } from 'application';
import { Mission } from 'domain/mission/mission';
import { useMission } from '../../hooks/UseMissions';
import { missionList } from '../../store/Mission/mission.actions';
import { ListingCards } from 'infrastructure/view/components';

export const Missions = () => {
  const { state, dispatch } = useMission();
  const [id, setId] = useState('');
  const [catalog, setCatalog] = useState<Mission[]>([]);
  const [status, setStatus] = useState<boolean>();
  const [position, setPosition] = useState({ xPos: 0, yPos: 0 });
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const missions: any = missionServices
      .getMissions()
      .then(data => dispatch(missionList(data)));
    setCatalog(missions);
  }, [status]);

  const functions = {
    toggleMenu: (e: React.MouseEvent) => {
      e.preventDefault();
      setPosition({ xPos: e.pageX, yPos: e.pageY - 80 });
      setOpenMenu(!openMenu);
    },
    setStatus: async () => {
      const newStatus = { isActive: !status };
      await missionServices.updateMission(id, newStatus);
      setStatus(newStatus.isActive);
    },
    getStatus: () => status,
    setId: id => {
      setId(id);
    },
    setPropStatus: propStatus => {
      setStatus(propStatus);
    },
    displayOption: () => (status ? 'Désactiver' : 'Activer'),
    handleClickDelete: async () => {
      if (window.confirm('Êtes-vous sur de vouloir supprimer cette mission ?'))
        deleteMission();
    },
  };
  useEffect(() => {
    setCatalog(state.catalog);
  }, [state.catalog]);

  const deleteMission = async () => {
    const deletedMsg = await missionServices.deleteMission(id);
    console.log(deletedMsg);
    missionServices
      .getMissions()
      .then(missions => dispatch(missionList(missions)));
  };

  return (
    <ListingCards
      title="Les Missions"
      props={catalog}
      functions={functions}
      position={position}
      open={openMenu}
    />
  );
};
