import { Router } from "express";
import { CreateAppointmentController } from "modules/treatments/useCases/createAppointment/CreateAppointmentController";
import { FindNextAppointmentByPetIdController } from "modules/treatments/useCases/findNextAppointmentByPetId/FindNextAppointmentByPetIdController";
import { ListAppointmentsByPetIdController } from "modules/treatments/useCases/listAppointmentsByPetId/ListAppointmentsByPetIdController";


const appointmentsRoutes = Router();

const createAppointmetController = new CreateAppointmentController();
const listAppointmentsByPetId = new ListAppointmentsByPetIdController();
const findNextAppointmentByPetId = new FindNextAppointmentByPetIdController();


appointmentsRoutes.post("/",  createAppointmetController.handle);
appointmentsRoutes.get("/", listAppointmentsByPetId.handle);
appointmentsRoutes.get("/next/:pet_id", findNextAppointmentByPetId.handle);


export { appointmentsRoutes };