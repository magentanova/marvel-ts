import { ICharacter } from '../services/marvel-service';
import { initialState } from './store';
import { IAction } from './types';


export const characters = (state=initialState.characters, action:IAction<ICharacter[]>):ICharacter[] => {
    switch (action.type) {
        case 'CHARACTERS_LOADED':
            return action.payload
        default: 
            return state
    }
}

// undefined??? better way around this?
export const charactersLoading = (state=initialState.charactersLoading, action:IAction<ICharacter[] | undefined>):boolean => {
    switch (action.type) {
        case 'CHARACTERS_LOADING':
            return true
        case 'CHARACTERS_LOADED': 
            return false
        default:
            return state
    }
}

export const detailCharacter = (state=initialState.detailCharacter, action:IAction<number>):number => {
    switch (action.type) {
        case 'SELECT_CHARACTER':
            return action.payload
        default: 
            return state
    }
}