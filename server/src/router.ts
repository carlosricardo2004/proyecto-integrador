import { Router } from "express";
import { createEstacionamiento, getEstacionamientoById, updateEstacionamiento, deleteEstacionamiento, getEstacionamientos } from "./handlers/estacionamiento";
import { body, param } from "express-validator";
import { handleInputerrors } from "./middleware";

const router = Router();

router.get("/", getEstacionamientos);

router.get("/:id", 
    param("id").isInt().withMessage("El id debe ser un número entero"),
    handleInputerrors,
    getEstacionamientoById
);

router.post("/", 
    body("tipoDeServicio")
        .notEmpty().withMessage("El tipo de servicio es requerido")
        .isIn(["estacionamiento", "autolavado", "cambio de aceite"]).withMessage("El tipo de servicio no es válido"),
    body("automovil")
        .notEmpty().withMessage("El nombre del automóvil es requerido"),
    body("precio")
        .isNumeric().withMessage("El precio debe ser un número")
        .notEmpty().withMessage("El precio no puede estar vacío")
        .custom(value => value > 0).withMessage("El precio debe ser mayor a 0"),
    handleInputerrors,
    createEstacionamiento
);

router.put("/:id", 
    param("id").isInt().withMessage("El id debe ser un número entero"),
    body("tipoDeServicio")
        .notEmpty().withMessage("El tipo de servicio es requerido")
        .isIn(["estacionamiento", "autolavado", "cambio de aceite"]).withMessage("El tipo de servicio no es válido"),
    body("automovil")
        .notEmpty().withMessage("El nombre del automóvil es requerido"),
    body("precio")
        .isNumeric().withMessage("El precio debe ser un número")
        .notEmpty().withMessage("El precio no puede estar vacío")
        .custom(value => value > 0).withMessage("El precio debe ser mayor a 0"),
    handleInputerrors,
    updateEstacionamiento
);

router.delete("/:id",
    param("id").isInt().withMessage("El id debe ser un número entero"),
    handleInputerrors,
    deleteEstacionamiento
);

export default router;