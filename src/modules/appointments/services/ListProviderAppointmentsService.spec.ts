import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppontmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointmentsService', () => {
    beforeEach(() => {
        fakeAppontmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppontmentsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        const appointment1 = await fakeAppontmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 7, 18, 14, 0, 0),
        });

        const appointment2 = await fakeAppontmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 7, 18, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: 'provider',
            year: 2020,
            month: 8,
            day: 18,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
