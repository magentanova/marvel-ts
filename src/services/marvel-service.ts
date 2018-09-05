interface ICharacterParams {
    startsWith?: string;
}

export interface IThumbnail {
    extension: string;
    path: string;
}

export interface ICharacter {
    id: number;
    comics: {available:number};
    name: string;
    description: string;
    modified: Date;
    urls: Array<{type:string, url:string}>;
    thumbnail: IThumbnail;
}

// rosa bonheur

export class MarvelService {
    public constructor(private baseURL:string = '/api/characters'){}

    public getCharacters(params: ICharacterParams = {}):Promise<ICharacter[]> {
        const paramString = '?' + Object.keys(params).map(k => k + '=' + params[k]).join('&');
        return fetch(this.baseURL + paramString)
            .then(resp => resp.json())
            .then<ICharacter[]>(resp => resp.data.results)
    }
}