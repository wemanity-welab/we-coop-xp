import { missionServices } from 'application';
import { useMission } from 'infrastructure/view/hooks/UseMissions';
import { missionfiltred } from 'infrastructure/view/store/Mission/mission.actions';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SearchBar = props => {
  const { title, client, description, profil, isActive } = props;
  console.log('props', props.location);

  const { dispatch } = useMission();
  const keywords = useParams();
  const [tags, setTags] = useState<string[]>([]);

  const missions = missionServices.missionfiltred(tags);

  const addTag = e => {
    if (e.key === 'Enter') {
      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value]);

        e.target.value = '';
      }
    }
  };

  const removeTag = removedTag => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };

  useEffect(() => {
    try {
      missions.then(data => dispatch(missionfiltred(data)));
    } catch (exception) {
      console.error(exception);
    }
  }, [tags]);

  return (
    <div className="sideBar">
      <div className="wrapper">
        <input className="input" onKeyDown={addTag} />
        <div className="searchbtn">
          <i className="fas fa-search"></i>
        </div>
      </div>
      <div className="tags" id="tags">
        {tags.map((tag, index) => {
          return (
            <div key={index} className="tag">
              {tag}

              <span onClick={() => removeTag(tag)}>x</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
