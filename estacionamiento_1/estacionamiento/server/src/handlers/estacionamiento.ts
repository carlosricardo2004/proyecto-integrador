import { Request, Response } from 'express';
import Estacionamiento from '../models/Estacionamiento.model';

export const getEstacionamientos = async (req: Request, res: Response) => {
    try {
        const estacionamientos = await Estacionamiento.findAll({
            order: [["id", "ASC"]],
            attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluye solo las columnas existentes
            limit: 5,
        });
        res.json({ data: estacionamientos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los estacionamientos" });
    }
};

export const getEstacionamientoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const estacionamiento = await Estacionamiento.findByPk(id);
        if (!estacionamiento) {
            res.status(404).json({ error: "Estacionamiento no encontrado" });
            return;
        }
        res.json({ data: estacionamiento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el estacionamiento" });
    }
};

export const updateEstacionamiento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const estacionamiento = await Estacionamiento.findByPk(id);
        if (!estacionamiento) {
            res.status(404).json({ error: "Estacionamiento no encontrado" });
            return;
        }
        // Actualizar el estacionamiento
        const { tipoDeServicio, automovil, precio } = req.body;
        await estacionamiento.update({ tipoDeServicio, automovil, precio });
        res.json({ data: estacionamiento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el estacionamiento" });
    }
};

export const deleteEstacionamiento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const estacionamiento = await Estacionamiento.findByPk(id);
        if (!estacionamiento) {
            res.status(404).json({ error: "Estacionamiento no encontrado" });
            return;
        }
        await estacionamiento.destroy();
        res.json({ mensaje: "Estacionamiento eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el estacionamiento" });
    }
};

export const createEstacionamiento = async (req: Request, res: Response) => {
    try {
        const { tipoDeServicio, automovil, precio } = req.body;

        // Validar que los campos requeridos están presentes
        if (!tipoDeServicio || !automovil || !precio) {
            res.status(400).json({ error: "Faltan datos requeridos" });
            return;
        }

        // Crear el estacionamiento
        const estacionamiento = await Estacionamiento.create({ tipoDeServicio, automovil, precio });
        res.status(201).json({ data: estacionamiento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el estacionamiento" });
    }
};