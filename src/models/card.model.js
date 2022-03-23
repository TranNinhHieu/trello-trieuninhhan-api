import Joi from 'joi'
import {getDB} from '*/config/mongodb'

// define Card collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    boardID:Joi.string().required(),
    columnID:Joi.string().required(),
    title:Joi.string().required().min(3).max(20),
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
        const value = await validateSchema(data)
        const result = await getDB().collection(cardCollectionName).insertOne(value)
        return result
    } catch (error) {
        console.error(error)
    }
}

export const CardModel = { createNew }