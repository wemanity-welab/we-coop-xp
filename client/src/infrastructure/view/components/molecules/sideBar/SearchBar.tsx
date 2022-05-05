import { missionServices } from 'application';
import { useMission } from 'infrastructure/view/hooks/UseMissions';
import { missionFiltred } from 'infrastructure/view/store/Mission/mission.actions';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export const SearchBar = props => {
  const { title, client, description, profile, isActive } = props;

  const { dispatch } = useMission();
  const [tags, setTags] = useState<string[]>([]);
  const history = useHistory();
  //   history.replace(`/missions/search/?criteria=${tags}`);
  const missions = missionServices.missionFiltred(tags);

  const addTag = e => {
    if (e.key === 'Enter') {
      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value]);
        console.log('tags', tags);

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
      missions.then(data => dispatch(missionFiltred(data)));
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
