import { CooperatorDomain } from '../../../src/domain/Cooperator/cooperator.domain';
import { CooperatorService } from '../../../src/domain/Cooperator/cooperator.service';
import AdapterMock from '../mock/mockedAdapter';

const cooperator = new CooperatorDomain({
  id: '1',
  firstName: 'Mickaël',
  lastName: 'Zonton',
  phoneNumber: '157-232-6965',
  email: 'mzonton@pen.io',
  practice: 'Tech',
  m3: 'Estève',
  mentor: 'Lóng',
});

describe('Cooperator service testing', () => {
  let service: CooperatorService;
  let adapter: any;

  beforeAll(async () => {
    adapter = new AdapterMock();
    service = new CooperatorService(adapter);
  });

  describe('Sucessful case', () => {
    it('should return saved cooperator', async () => {
      expect(await service.save(cooperator)).toEqual(cooperator);
    });

    it('should return a cooperators list', async () => {
      const cooperatorsList = (await service.getAll())[0];
      expect(cooperatorsList).toEqual(cooperator);
    });

    it('should update a cooperator ', async () => {
      const newCooperator = new CooperatorDomain({
        id: '1',
        firstName: 'Mickaël',
        lastName: 'Zonton',
        phoneNumber: '0000000000',
        email: 'mickaelzonton@gogole.io',
        practice: 'Tech',
        m3: 'Estève',
        mentor: 'Lóng',
      });
      const cooperatorUpdated = await service.update('1', newCooperator);
      expect(cooperatorUpdated).toEqual(newCooperator);
    });

    it('should delete a cooperators', async () => {
      const newCooperator = new CooperatorDomain({
        id: '1',
        firstName: 'Mickaël',
        lastName: 'Zonton',
        phoneNumber: '0000000000',
        email: 'mickaelzonton@gogole.io',
        practice: 'Tech',
        m3: 'Estève',
        mentor: 'Lóng',
      });
      expect(await service.getOne('1')).toEqual(newCooperator);
    });

    it('Should display a list of missions with multiple profile keywords search', async () => {
      const request = await service.search(['Tech']);
      const expectedCooperators = [
        {
          id: '1',
          firstName: 'Mickaël',
          lastName: 'Zonton',
          phoneNumber: '0000000000',
          email: 'mickaelzonton@gogole.io',
          practice: 'Tech',
          m3: 'Estève',
          mentor: 'Lóng',
        },
      ];

      expect(request[0]).toMatchObject(expectedCooperators[0]);
    });

    it('should delete a cooperators', async () => {
      expect(await service.remove('1')).toEqual('Cooperator n°1 supprimée.');
    });
  });

  describe('Error case', () => {
    it('Should try to get cooperators list and return an Error with the message: "Aucun cooperateur dans la base de données."', async () => {
      try {
        await service.getAll();
      } catch (error) {
        expect(error.message).toBe(
          'Aucun cooperateur dans la base de données.',
        );
        expect(error instanceof Error).toBe(true);
      }
    });
    it('Should try to get a cooperator and return an Error with the message: "Cooperateur introuvable."', async () => {
      try {
        await service.getOne('1');
      } catch (error) {
        expect(error.message).toBe('Cooperateur introuvable.');
        expect(error instanceof Error).toBe(true);
      }
    });
    it('Should try to delete a cooperator return an Error with the message: "Cooperateur introuvable ou déjà supprimée."', async () => {
      try {
        await service.remove('1');
      } catch (error) {
        expect(error.message).toBe(
          'Cooperateur introuvable ou déjà supprimée.',
        );
        expect(error instanceof Error).toBe(true);
      }
    });
    it('Should try to update a cooperator return an Error with the message: "Cooperateur introuvable."', async () => {
      try {
        const data = {
          firstName: 'Mickaël',
          lastName: 'Zonton',
        } as Partial<CooperatorDomain>;
        await service.update('1', data);
      } catch (error) {
        expect(error.message).toBe('Cooperateur introuvable.');
        expect(error instanceof Error).toBe(true);
      }
    });
    it('Should try to search a cooperator by keyword and return an Error with the message: "Cooperateur introuvable."', async () => {
      try {
        await service.search(['Tech']);
      } catch (error) {
        expect(error.message).toBe('Aucune correspondance.');
        expect(error instanceof Error).toBe(true);
      }
    });
  });
});
