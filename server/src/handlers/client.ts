import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Client from "../models/Client.model";

export const handleInputerrors = (req: Request, res: Response, next:NextFunction): void=> {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }else{
        next()
    }
}

export const createClient = async (req: Request, res: Response) => {
    const client = new Client(req.body);
    client.save()
    res.json({data: client})
}