import Joi from 'joi'
import { ObjectId  } from 'mongodb'
import {getDB} from '*/config/mongodb'

// define Card collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    boardId:Joi.string().required(),
    columnId:Joi.string().required(),
    title:Joi.string().required().min(3).max(35).trim(),
    cover:Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroyed: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data)
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId),
            columnId: ObjectId(validatedValue.columnId)
        }
        const result = await getDB().collection(cardCollectionName).insertOne(insertValue)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const CardModel = { 
    cardCollectionName,
    createNew 
}