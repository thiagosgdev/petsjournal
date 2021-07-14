export interface ICreateAppointmentDTO {
    name: string,
    description: string,
    date: Date,
    pet_id: string,
    created_at: Date,
    updated_at: Date,
    id?: string
}