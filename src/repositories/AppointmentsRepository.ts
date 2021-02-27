import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppoointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );
    const findAppoointment = await this.findOne({
      where: { date },
    });

    return findAppoointment || null;
  }
}

// findByDate(date).then(response => )
// const response = await findByDate(date)

export default AppointmentsRepository;
