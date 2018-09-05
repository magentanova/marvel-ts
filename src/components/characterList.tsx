import * as React from 'react';
import { IState } from '../state/types';
import Character from './character';

interface IProps extends IState {
    dispatch: () => any;
}

class CharacterList extends React.PureComponent<IProps, {}> {

    constructor(props: IProps) {
        super(props)
    }

    public render() {
        return (
            <div className="is-narrow character-list container" >
                {this.props.characters.map(charData => 
                    <Character 
                        character={charData} 
                        detailCharacter={this.props.detailCharacter}
                        dispatch={this.props.dispatch} 
                        key={charData.id} 
                        />)}
            </div>
        )
    }
}

export default CharacterList;