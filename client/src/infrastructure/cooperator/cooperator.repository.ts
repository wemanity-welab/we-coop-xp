import { ICooperatorRepository } from 'domain/cooperator/cooperatoor.irepository';
import { Http } from 'infrastructure/util/Http';
import { CooperatorDTO } from './cooperator.dto';
import { Cooperator } from '../../domain/cooperator/cooperator';

export const cooperatorRepository = (client: Http): ICooperatorRepository => ({
  getCooperators: async () => {
    const cooperators = await client.get<CooperatorDTO[]>('/cooperators');

    return cooperators.map(
      (CooperatorDto): Cooperator => ({
        id: CooperatorDto.id,
        firstName: CooperatorDto.firstName,
        lastName: CooperatorDto.lastName,
        phoneNumber: CooperatorDto.phoneNumber,
        email: CooperatorDto.email,
        practice: CooperatorDto.practice,
        m3: CooperatorDto.m3,
        mentor: CooperatorDto.mentor,
        disponible: CooperatorDto.disponible,
      }),
    );
  },

  updateCooperator: async (id, data) => {
    const cooperatorUpdated = await client.patch<CooperatorDTO>(
      `/cooperators/${id}`,
      data,
    );
    return cooperatorUpdated;
  },

  deleteCooperator: async id => {
    const cooperatorDeleted = await client.delete<String>(`/cooperators/${id}`);
    return cooperatorDeleted;
  },

  addCooperator: async (cooperator: Cooperator) => {
    const postCooperator = await client.post<CooperatorDTO>(
      '/cooperators',
      cooperator,
    );

    return postCooperator;
  },

  cooperatorFiltred: async (keywords: string[]) => {
    const parameterizeArray = (key, arr) => {
      arr = arr.map(encodeURIComponent);
      return '?' + 'criteria=' + arr.join('&' + key + '=');
    };
    const url =
      '/cooperators/search/' + parameterizeArray('criteria', keywords);

    const cooperatorFiltred = await client.get<CooperatorDTO[]>(url);
    console.log('cooperatorFiltred', cooperatorFiltred);

    console.log('url', url);

    return cooperatorFiltred.map(
      (CooperatorDto): Cooperator => ({
        id: CooperatorDto.id,
        firstName: CooperatorDto.firstName,
        lastName: CooperatorDto.lastName,
        phoneNumber: CooperatorDto.phoneNumber,
        email: CooperatorDto.email,
        practice: CooperatorDto.practice,
        m3: CooperatorDto.m3,
        mentor: CooperatorDto.mentor,
        disponible: CooperatorDto.disponible,
      }),
    );
  },
});
