// @flow

import { Component } from 'react';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import {
  PlayButton,
  Progress,
  VolumeControl,
  Timer,
} from 'react-soundplayer/components';

import 'react-soundplayer/styles/buttons.css';
import 'react-soundplayer/styles/cover.css';
import 'react-soundplayer/styles/icons.css';
import 'react-soundplayer/styles/progress.css';
import 'react-soundplayer/styles/volume.css';
import styles from './Podcast.css';
import { Flex } from 'app/components/Layout';
import Icon from 'app/components/Icon';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import LoadingIndicator from 'app/components/LoadingIndicator';

type Props = {
  id: number,
  track: any,
  currentTime: any,
  duration: any,
  description: string,
  playing: boolean,
  actionGrant: Array<String>,
};

class LegoSoundCloudPlayer extends Component<Props, *> {
  render() {
    const { id, track, currentTime, duration, actionGrant } = this.props;
    if (!track) {
      return (
        <p style={{ textAlign: 'center' }}>
          {actionGrant.includes('edit') && (
            <Link
              to={`/podcasts/${id}/edit`}
              style={{ marginRight: '10px', whiteSpace: 'nowrap' }}
            >
              <Icon
                size={17}
                name="options-outline"
                style={{ marginRight: '5px' }}
              />
              Det er noe feil med linken til denne podcasten, trykk her for å
              endre den
            </Link>
          )}
          <LoadingIndicator key={165442} loading />
        </p>
      );
    }
    const [date] = track.created_at.split(' ');
    return (
      <section>
        <div className={styles.header}>
          <span>
            <Icon
              name="musical-notes"
              size={15}
              style={{ marginRight: '5px' }}
            />
            <span className={styles.title}>{track ? track.title : ''}</span>
          </span>
          {actionGrant.includes('edit') && (
            <Link
              to={`/podcasts/${id}/edit`}
              style={{ marginRight: '10px', whiteSpace: 'nowrap' }}
            >
              <Icon
                name="options-outline"
                size={17}
                style={{ marginRight: '5px' }}
              />
              Edit
            </Link>
          )}
        </div>
        <Flex column style={{ padding: '10px 10px 0' }}>
          <Flex className={styles.playerRow}>
            <PlayButton
              className={styles.playButton}
              {...(this.props: Object)}
            />
            <VolumeControl
              className={styles.volume}
              rangeClassName={styles.volume}
              {...(this.props: Object)}
            />
            <Progress
              className={styles.progress}
              innerClassName={styles.progressInner}
              value={(currentTime / duration) * 100 || 0}
              {...(this.props: Object)}
            />
          </Flex>
          <Timer
            className={styles.timer}
            duration={track ? track.duration / 1000 : 0}
            {...(this.props: Object)}
          />
          <Flex className={styles.extra}>
            <span>
              <Icon name="time" size={15} style={{ margin: '0 5px' }} />
              {moment(date, 'YYYY/MM/DD').format('Do MMM YYYY')}
            </span>
            <span>
              Lyttere
              <Icon name="stats-chart" size={15} style={{ margin: '0 5px' }} />
              {track.playback_count}
            </span>
          </Flex>
        </Flex>
      </section>
    );
  }
}

export default withSoundCloudAudio(LegoSoundCloudPlayer);
