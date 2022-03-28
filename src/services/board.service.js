import { BoardModel } from '*/models/board.model';
import { cloneDeep } from 'lodash';

const createNew = async (data) => {
    try {
        const result = await BoardModel.createNew(data)
        return result
    } catch (error) {
        throw new Error(error)
    }

}

const getFullBoard = async (boardId) => {
    try {
        const board = await BoardModel.getFullBoard(boardId)

        if(!board|| !board.columns){
            throw new Error ('Board not found')
        }

        const transformBoard = cloneDeep(board)
        //filter _destroyed
        transformBoard.columns= transformBoard.columns.filter(column => column._destroyed===false)

        //add card to earch column
        transformBoard.columns.forEach(column => {
            column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
        })

        //Sort column by columOrder, sort card by cardOrder, this step will apass to front end DEV


        //Remove card data from boards
        delete transformBoard.cards
        return transformBoard
    } catch (error) {
        console.error(error.message)
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
        if (updateDate.columns) delete updateDate.columns

        const updatedBoard = await BoardModel.update(id, updateDate)
        
        return updatedBoard
    } catch (error) {
        throw new Error(error)
    }

}

export const BoardService = { 
    createNew,
    getFullBoard,
    update 
}