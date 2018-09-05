
import * as React from 'react';

import { MarvelService } from '../services/marvel-service';
import { initialState } from '../state/store';
import { dispatch, store } from '../state/store';
import {IState} from '../state/types';
import CharacterList from './characterList';

class App extends React.PureComponent<{},IState> {
  public state: IState;
  private unsubscribe:() => void;
  private client: MarvelService;

  constructor(props:{}) {
    super(props);
    this.state = initialState;
    this.client = new MarvelService();
  }

  public componentWillMount() {
    this.unsubscribe = store.subscribe(()=> {
      this.setState({
        ...store.getState()
      })
    })

    this.client.getCharacters()
        .then(chars => dispatch({
          payload: chars,
          type: 'CHARACTERS_LOADED'
        }));
  }

  public componentWillUnmount() {
    this.unsubscribe()
  }

  public render() {
    const listProps = {
      ...this.state,
      dispatch
    }

    return (
      <div className="container">
        <header className="has-text-centered header">
          <h1 className="is-size-1 title">Marvel Mayhem</h1>
        </header>
        <CharacterList {...listProps} />
      </div>
    );
  }
}

export default App;
