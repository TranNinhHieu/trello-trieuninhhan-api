import Joi from 'joi'
import {getDB} from '*/config/mongodb'

// define Column collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boardID:Joi.string().required(),
    title:Joi.string().required().min(3).max(20),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroyed: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(columnCollectionName).insertOne(value)
        return result
    } catch (error) {
        console.error(error)
    }
}

export const ColumnModel = { createNew }