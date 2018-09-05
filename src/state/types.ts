import {ICharacter} from '../services/marvel-service';

export interface IState {
    characters: ICharacter[];
    charactersLoading: boolean;
    detailCharacter: number;
};

export interface IAction<T> {
    type: string;
    payload: T;
}
