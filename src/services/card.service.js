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

export const CardService = { createNew }