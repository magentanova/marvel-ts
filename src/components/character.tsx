import * as React from 'react';
import { ICharacter, IThumbnail } from '../services/marvel-service';
import { IAction, IState } from '../state/types';

type TCharProps = {
    
    dispatch: (action:IAction<any>) => void;
    character: ICharacter;
} & Pick<IState,'detailCharacter'>;

class Character extends React.PureComponent<TCharProps, {}> {
    private boundSelector: () => void;

    constructor(props:TCharProps) {
        super(props)
        this.boundSelector = this.selectMe.bind(this)
    }

    public selectMe() {
        const myId = this.props.character.id;
        const detailId = this.props.detailCharacter;
        console.log(myId, detailId)
        this.props.dispatch({
            payload: myId === detailId ? '' : myId,
            type: 'SELECT_CHARACTER'
        })
    }

    public render() {
        return (
            <div className="character media" onClick={this.boundSelector}>
                <CharacterThumb thumbData={this.props.character.thumbnail} />
                <CharacterDeets detailCharacter={this.props.detailCharacter} character={this.props.character} />
            </div>
        )
    }
}

const getThumbnail = (thumbData:IThumbnail):string => {
    if (thumbData) {
        return thumbData.path + '.' + thumbData.extension
    }
    else {
        return ''
    }
}

const CharacterThumb = (props:{thumbData:IThumbnail}) => (
    <div className="character-thumb-wrapper  media-left">
        <img className="image is-96x96 character-thumb" src={getThumbnail(props.thumbData)} />
    </div>
)

const CharacterDeets = (props:Pick<TCharProps, 'detailCharacter'> & {character:ICharacter}) => {
    let extraDeets = <div />;
    if (props.detailCharacter === props.character.id) {
        extraDeets = (
            <div className="extra-deets content">
                <p className="description">Appears in {props.character.comics.available} comics!</p>
                <p className="link-message">Check out this character's 
                    <a target="_blank" href={props.character.urls[1].url}>wiki</a>
                </p>
            </div>
        )
    }
    console.log(props.character)
    return (
    <div className="character-deets-wrapper media-content">
        <div className="content">
            <p className="is-size-2" ><strong>{props.character.name}</strong></p>
            {extraDeets}
        </div>
    </div>
    )
}
export default Character;