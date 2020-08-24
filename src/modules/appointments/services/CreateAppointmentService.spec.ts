import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/Fakes/FakeNotificationsRepository';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppontmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppontmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        createAppointment = new CreateAppointmentService(
            fakeAppontmentsRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        );
    });
    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'asuidasuihasd1245',
            user_id: '102030',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('asuidasuihasd1245');
    });

    it('should not be able to create two appointments on the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointmentDate = new Date(2020, 4, 10, 13);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: 'asuidasuihasd1245',
            user_id: '102030',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: 'asuidasuihasd1245',
                user_id: '102030',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: 'asuidasuihasd1245',
                user_id: '102030',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                provider_id: '102030',
                user_id: '102030',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 7),
                provider_id: '102030',
                user_id: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 18),
                provider_id: '102030',
                user_id: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
