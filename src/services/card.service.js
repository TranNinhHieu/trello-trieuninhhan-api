import { CardModel } from '*/models/card.model'
import { ColumnModel } from '*/models/column.model'

const createNew = async (data) => {
    try {
        const newCard = await CardModel.createNew(data)
        const updatedColumn = await ColumnModel.pushCardOrder(data.columnId, newCard.insertedId)
        // if (updatedColumn)
        //     return data // update successfully
        // return null // update failed
    } catch (error) {
        throw new Error(error)
    }

}

const update = async (id, data) => {
    try {
        const updateDate = {
            ...data,
            updatedAt:Date.now()
        }
        if (updateDate._id) delete updateDate._id

        const updatedCard = await CardModel.update(id, updateDate)
        
        return updatedCard
    } catch (error) {
        throw new Error(error)
    }

}

export const CardService = { 
    createNew,
    update
}