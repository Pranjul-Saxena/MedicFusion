import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import superadminRoutes from "./routes/superAdmin.routes.js";
import userRoutes from "./routes/user.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
// import errorMiddleware from "./middlewares/error.middleware.js";
// import env from "./config/constant/index.js";

const app = express();
// console.log(env.FRONTEND_URL);
app.use(cors({
    // origin: [env.FRONTEND_URL],
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); //what is the server doing? it give the info
app.use('/ping', (req, res, next) => {
    res.send('Pong! Your MedicFusion is ready for services');
});
//route modules
app.use('/api/v1/superadmin', superadminRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/appointments', appointmentRoutes);

app.all('*', (req, res, next) => {
    res.status(404).send('404 Not Found');
});
// app.use(errorMiddleware);
export default app;