import { CooperatorService } from 'domain/cooperator/CooperatorService';
import { cooperatorRepository } from 'infrastructure/cooperator/cooperator.repository';
import { HttpAxios } from 'infrastructure/util/httpAxios';

const repository = cooperatorRepository(HttpAxios);
const cooperatorServices = CooperatorService(repository);
export default cooperatorServices;
