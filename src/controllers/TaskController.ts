import { Request, Response } from 'express'
import { IResponse } from 'src/interfaces/Response'
import { ITask, ITaskModel } from '../interfaces/Task'
import TaskModel from '../models/TaskModel'

class Task {
    model: ITaskModel

    constructor(model?: ITaskModel) {
        this.model = model || new TaskModel
    }

    readAll = (req: Request, res: Response) => {
        const tasks: ITask[] = this.model.findAll()

        const jsonToReturn: IResponse = { status: true, message: 'ok', data: tasks }

        res.status(200).json(jsonToReturn)
    }

    readById = (req: Request, res: Response) => {
        let jsonToReturn: IResponse

        const responses = {
            'badFormatId': { status: false, message: 'ID must be a number' },
            'notFound': { status: false, message: 'No task were found with this ID' },
            'found': { status: true, message: 'ok' }
        }

        const { id } = req.params
        const idParsed = Number(id)

        if(!idParsed) jsonToReturn = responses['badFormatId']
        else {
            const task: ITask | undefined = this.model.findById(idParsed)
    
            jsonToReturn = !task ? responses['notFound'] : { ...responses['found'], data: task }
        }
        
        
        res.status(200).json(jsonToReturn)
    }

    create = (req: Request, res: Response) => {
        let jsonToReturn: IResponse
        
        const responses = {
            'missingValues': { status: false, message: 'Required fields are missing' },
            'created': { status: true, message: 'Task created successfully' },
        }
        
        const { title, description, completed } = req.body

        if(!title || !description || !completed) jsonToReturn = responses['missingValues']
        else {
            const task = this.model.create({ title, description, completed })
            jsonToReturn = { ...responses['created'], data: task }
        }


        res.status(200).json(jsonToReturn)
    }

    update = (req: Request, res: Response) => {
        let jsonToReturn: IResponse
        const responses = {
            'badFormatId': { status: false, message: 'ID must be a number' },
            'missingValues': { status: false, message: 'Required fields are missing' },
            'notFound': { status: false, message: 'No task were found with this ID' },
            'success': { status: true, message: 'Task updated successfully' },
        }

        const { id } = req.params
        const idParsed = Number(id)
        if(!idParsed) {
            jsonToReturn = responses['badFormatId']
            return res.status(200).json(jsonToReturn)
        } 

        const { title, description, completed } = req.body
        if(!title || !description || !completed) {
            jsonToReturn = responses['missingValues']
            return res.status(200).json(jsonToReturn)
        }

        const updated = this.model.update(idParsed, { title, description, completed })
        jsonToReturn = updated ? { ...responses['success'], data: updated } : responses['notFound']

        res.status(200).json(jsonToReturn)
    }

    delete = (req: Request, res: Response) => {
        let jsonToReturn: IResponse
        const responses = {
            'badFormatId': { status: false, message: 'ID must be a number' },
            'notFound': { status: false, message: 'No task were found with this ID' },
            'success': { status: true, message: 'Task deleted successfully' },
        }

        const { id } = req.params
        const idParsed = Number(id)
        if(!idParsed) {
            jsonToReturn = responses['badFormatId']
            return res.status(200).json(jsonToReturn)
        } 

        const deleted: number | undefined = this.model.delete(idParsed)

        jsonToReturn = typeof deleted === 'number' ? { ...responses['success'] } : responses['notFound']
        res.status(200).json(jsonToReturn)
    }
}

export default new Task