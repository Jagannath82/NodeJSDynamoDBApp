
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Router, Request, Response } from 'express';
import { createUser, getUserById } from "../dao/UserDao";
import { User } from "../model/User";
import express from "express"
import Logger from './../logger';
import { param, body, validationResult } from 'express-validator';


const taskValidationRules = [
    param('city').notEmpty().withMessage('Title is required'),
    param('name').notEmpty().withMessage('Description is required')
  ];

export const registerUserRoute = (app : express.Application) => {
    
    app.post('/users', (req, res) => {
        createUser(req.body);
        res.send('Record created successfully');
    });

    app.get('/users', taskValidationRules, (req:Request, res:Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let response = getUserById(req.query.city, req.query.name).then(data =>{
            Logger.info("User details retired");
            res.send(data.Item);
        }).catch(error => {
            console.error(error);
        });
        
    });
}

