
export interface ICreateTreatmentDTO {
    name: string,
    description: string,
    pet_id: string,
    appointment_id: string,    
    start_date?:Date,
    end_date?: Date,
    created_at: Date,
    updated_at: Date,
    id?: string,
}