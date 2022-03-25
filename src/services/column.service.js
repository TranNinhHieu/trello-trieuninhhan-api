import { ColumnModel } from '*/models/column.model';
import { BoardModel } from '*/models/board.model';
const createNew = async (data) => {
    try {
        const newColumn = await ColumnModel.createNew(data)
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
        const result = await ColumnModel.update(id, updateDate)
        return result
    } catch (error) {
        throw new Error(error)
    }

}

export const ColumnService = { 
    createNew, 
    update 
}