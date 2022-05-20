import { missionServices } from 'application';
import { useMission } from 'infrastructure/view/hooks/UseMissions';
import { missionFiltred } from 'infrastructure/view/store/Mission/mission.actions';
import React, { useEffect, useRef, useState } from 'react';
import dataColor from '../../../../../utils/tagsColor.json';

export const SearchBar = props => {
  const { title, client, description, profile, isActive } = props;
  const divRef = React.useRef<HTMLDivElement>(null);

  const { dispatch } = useMission();
  const [tags, setTags] = useState<string[]>([]);

  const missions = missionServices.missionFiltred(tags);

  const addTag = async e => {
    if (e.key === 'Enter' && e.target.value.length > 0) {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  const removeTag = removedTag => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };

  useEffect(() => {
    try {
      missions.then(data => dispatch(missionFiltred(data)));

      for (const [key, value] of Object.entries(dataColor)) {
        if (tags.includes(key) && divRef.current?.textContent === key + 'x') {
          divRef.current.style.backgroundColor = value;
        }
      }
    } catch (exception) {
      console.error(exception);
    }
  }, [tags]);

  return (
    <div className="sideBar">
      <div className="wrapper">
        <input
          className="input"
          onKeyDown={addTag}
          placeholder="Rechercher...."
        />
        <div className="searchbtn">
          <img src="../Vector-search.png" alt="icon search" />
        </div>
      </div>
      <div className="tags" id="tags">
        {tags.map((tag, index) => {
          return (
            <div key={index} ref={divRef} className="tag">
              {tag}
              <span onClick={() => removeTag(tag)}>x</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
