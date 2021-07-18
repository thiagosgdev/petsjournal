import { Router } from "express";
import { CreateAppointmentController } from "modules/treatments/useCases/createAppointment/CreateAppointmentController";


const appointmentsRoutes = Router();

const createAppointmetController = new CreateAppointmentController();


appointmentsRoutes.post("/",  createAppointmetController.handle);


export { appointmentsRoutes };