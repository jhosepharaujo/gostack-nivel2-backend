import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppontmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppontmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: 'asuidasuihasd1245',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('asuidasuihasd1245');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const fakeAppontmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppontmentsRepository,
        );

        const appointmentDate = new Date(2020, 6, 20, 17);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: 'asuidasuihasd1245',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: 'asuidasuihasd1245',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
