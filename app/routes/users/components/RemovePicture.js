// @flow

import { Component } from 'react';
import Button from 'app/components/Button';
import styles from './RemovePicture.css';
import Icon from 'app/components/Icon';

type Props = {
  removePicture: (string) => Promise<*>,
  username: string,
};

type State = {
  selected: boolean,
};

export default class RemovePicture extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
  }

  handleOnClick = () => {
    if (this.state.selected)
      this.props
        .removePicture(this.props.username)
        .then(() => this.setState({ selected: false }));
  };

  toggleSelected = () => this.setState({ selected: !this.state.selected });

  render() {
    return (
      <div className={styles.buttons}>
        {this.state.selected ? (
          <Button onClick={this.toggleSelected}>Avbryt</Button>
        ) : (
          <Button danger onClick={this.toggleSelected}>
            <Icon name="trash" size={19} />
            Slett profilbildet
          </Button>
        )}
        {this.state.selected && (
          <Button danger onClick={this.handleOnClick}>
            Bekreft
          </Button>
        )}
      </div>
    );
  }
}
