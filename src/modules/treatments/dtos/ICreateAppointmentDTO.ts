export interface ICreateAppointmentDTO {
    name: string,
    description: string,
    date: Date,
    pet_id: string,
    id?: string
}