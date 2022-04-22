import React, { useCallback, useState, useEffect } from 'react';
import { Mission } from 'domain/models/Mission';
import { missionService } from 'domain/services/MissionService';
import { httpAxios } from 'infrastructure/instances/httpAxios';
import { missionRepository } from 'infrastructure/repositories/missionRepository';

export const ProductList = ({ onSelectProduct: onSelectMission }) => {
  const [missions, setMissions] = useState<Mission[]>([]);

  const getMissions = useCallback(async () => {
    try {
      const repository = missionRepository(httpAxios);
      const responseMissions = await missionService(repository).getMissions();
      setMissions(responseMissions);
    } catch (exception) {
      console.error(exception);
    }
  }, []);

  useEffect(() => {
    getMissions();
  }, []);

  const handleSelectMission = (mission: Mission) => {
    onSelectMission(mission);
  };

  return (
    <div>
      <h2>List of missions</h2>
      <ul>
        {missions.map(mission => (
          <li key={mission.id}>
            <button
              onClick={() => {
                handleSelectMission(mission);
              }}
            >
              {mission.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
