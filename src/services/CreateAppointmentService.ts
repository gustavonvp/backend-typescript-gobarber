/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../erros/AppError';
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/exceções
 * [x] Acesso ao repositório
 */

interface Request {
  provider_id: string;
  date: Date;
}

/**
 * Dependency Inversion (SOLID)
 * -- Single Responsability Principle
 * -- Dependecy Invertion Principle
 */

/*
 * DRY - Dont Repeat Yourself(not repeat business rulles)
 */

class CreateAppointmentService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppoointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppoointmentInSameDate) {
      throw new AppError('This appointment is already booked', 401);
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
