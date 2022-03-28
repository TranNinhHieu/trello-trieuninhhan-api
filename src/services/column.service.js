import { ColumnModel } from '*/models/column.model';
import { BoardModel } from '*/models/board.model';
import { CardModel } from '*/models/card.model';

const createNew = async (data) => {
    try {
        const newColumn = await ColumnModel.createNew(data)
        data.cards = []
        data.title
        const updatedBoard = await BoardModel.pushColumnOrder(data.boardId, newColumn.insertedId)
        if (updatedBoard)
            return newColumn // update successfully
        return null // update failed
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
        if (updateDate.cards) delete updateDate.cards


        const result = await ColumnModel.update(id, updateDate)
        if(data._destroyed){
            //delete many cards in this columnId
            CardModel.deleteMany(data.cardOrder)
        }
        return result
    } catch (error) {
        throw new Error(error)
    }

}

export const ColumnService = { 
    createNew, 
    update 
}