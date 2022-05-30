import React, { useEffect, useState } from 'react';

import { ListingCards } from 'infrastructure/view/components';
import { useCooperator } from 'infrastructure/view/hooks/UseCooperators';
import { Cooperator } from '../../../../../domain/cooperator/cooperator';
import cooperatorServices from 'application/cooperator/cooperator.factory';
import { cooperatorList } from 'infrastructure/view/store/Cooperator/cooperator.actions';

export const Cooperators = ({ setDisplay, setProp }) => {
  const { state, dispatch } = useCooperator();
  const [catalog, setCatalog] = useState<Cooperator[]>([]);
  const [status, setStatus] = useState<boolean>();
  const [position, setPosition] = useState({ xPos: 0, yPos: 0 });
  const [idList, setIdList] = useState<any>([]);
  const [idMenuList, setIdMenuList] = useState<any>([]);

  useEffect(() => {
    const cooperators: any = cooperatorServices
      .getCooperators()
      .then(data => dispatch(cooperatorList(data)));
    setCatalog(cooperators);
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
      const newStatus = { disponible: !status };
      await cooperatorServices.updateCooperator(id, newStatus);
      setStatus(newStatus.disponible);
    },

    handleClickDelete: async id => {
      if (window.confirm('Êtes-vous sur de vouloir supprimer cette mission ?'))
        deleteCooperator(id);
      setIdMenuList([]);
    },
  };

  const deleteCooperator = async id => {
    const deletedMsg = await cooperatorServices.deleteCooperator(id);
    console.log(deletedMsg);
    cooperatorServices
      .getCooperators()
      .then(cooperators => dispatch(cooperatorList(cooperators)));
  };

  return (
    <ListingCards
      title="Les Coopérateurs"
      cardType="cooperator"
      props={catalog}
      position={position}
      contextMenu={contextMenu}
      details={details}
      setDisplay={setDisplay}
      setProp={setProp}
    />
  );
};
