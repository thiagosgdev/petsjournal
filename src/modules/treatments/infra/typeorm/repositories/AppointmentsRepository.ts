import { ICreateAppointmentDTO } from "modules/treatments/dtos/ICreateAppointmentDTO";
import { IAppointmentsRepository } from "modules/treatments/repositories/IAppointmentsRepository";
import { getRepository, LessThan, MoreThan, Repository } from "typeorm";
import { Appointment } from "../entities/Appointment";

export class AppointmentsRepository implements IAppointmentsRepository {

    private repository: Repository<Appointment>;

    constructor() {
        this.repository = getRepository(Appointment);
    }

    async create({name, description, pet_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.repository.create({
            name,
            description,
            pet_id,
            date
        });

        await this.repository.save(appointment);

        return appointment;
    }
    async findAppointmentById(id: string): Promise<Appointment> {
        const appointment = await this.repository.findOne(id);

        return appointment;
    }
    async listAppointmentsByPetId(pet_id: string): Promise<Appointment[]> {
        const appointment = this.repository.find({
            where: {pet_id}
        });

        return appointment;
    }
    async listAppointmentsByPetIdByDate(pet_id: string, date: Date): Promise<Appointment[]> {
        const appointment = await this.repository.find({
            where: {date, pet_id}
        });

        return appointment;
    }

    async findNextAppointmentByDateByPetId(date: Date, pet_id: string): Promise<Appointment> {
        const appointmnet = await this.repository.findOne({
            where: {pet_id, date: MoreThan(date)},
            order: {
                date: 'ASC' 
            }           
        })

        return appointmnet;
    }

}