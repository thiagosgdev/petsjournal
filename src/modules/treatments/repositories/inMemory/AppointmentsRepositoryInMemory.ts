import { ICreateAppointmentDTO } from "modules/treatments/dtos/ICreateAppointmentDTO";
import { Appointment } from "modules/treatments/infra/typeorm/entities/Appointment";
import { appointmentsRoutes } from "shared/infra/http/routes/appointments.routes";
import { IAppointmentsRepository } from "../IAppointmentsRepository";


export class AppointmentsRepositoryInMemory implements IAppointmentsRepository {
    appointments: Appointment[] = [];
    async create({
        name,
        description,
        date,
        pet_id
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment;
        Object.assign(appointment, {
            name,
            description,
            date,
            pet_id 
        });

        this.appointments.push(appointment);
        
        return appointment;
    }
    async findAppointmentById(id: string): Promise<Appointment> {
        const appointment = this.appointments.find((appointment) => appointment.id === id);

        return appointment;
    }
    async listAppointmentsByPetId(pet_id: string): Promise<Appointment[]> {
        const appointmentList = this.appointments.filter((appointment) => appointment.pet_id === pet_id);

        return appointmentList;
    }
    async listAppointmentsByPetIdByDate(pet_id: string, date: Date): Promise<Appointment[]> {
        const appointmentList = this.appointments.filter((appointment) => appointment.pet_id === pet_id && appointment.date === date);

        return appointmentList;
    }
    async findNextAppointmentByDateByPetId(date: Date, pet_id: string): Promise<Appointment> {
        throw new Error("Method not implemented.");
    }

}