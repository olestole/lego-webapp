// @flow

import styles from './AddReactionEmoji.css';

type Props = {
  color: string,
};

const AddReactionEmoji = ({ color }: Props) => (
  <div className={styles.container}>
    <span>
      <svg
        aria-hidden="true"
        focusable="false"
        width="0.44em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        className={styles.emoji}
        viewBox="0 0 7 16"
      >
        <path
          fillRule="evenodd"
          d="M4 4H3v3H0v1h3v3h1V8h3V7H4V4z"
          fill={color}
        />
      </svg>
    </span>
    <span className={styles.smiley}>
      <svg
        aria-hidden="true"
        focusable="false"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        className={styles.emoji}
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.81 12.81a6.72 6.72 0 0 1-2.17 1.45c-.83.36-1.72.53-2.64.53-.92 0-1.81-.17-2.64-.53-.81-.34-1.55-.83-2.17-1.45a6.773 6.773 0 0 1-1.45-2.17A6.59 6.59 0 0 1 1.21 8c0-.92.17-1.81.53-2.64.34-.81.83-1.55 1.45-2.17.62-.62 1.36-1.11 2.17-1.45A6.59 6.59 0 0 1 8 1.21c.92 0 1.81.17 2.64.53.81.34 1.55.83 2.17 1.45.62.62 1.11 1.36 1.45 2.17.36.83.53 1.72.53 2.64 0 .92-.17 1.81-.53 2.64-.34.81-.83 1.55-1.45 2.17zM4 6.8v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2H5.2C4.53 8 4 7.47 4 6.8zm5 0v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2h-.59C9.53 8 9 7.47 9 6.8zm4 3.2c-.72 1.88-2.91 3-5 3s-4.28-1.13-5-3c-.14-.39.23-1 .66-1h8.59c.41 0 .89.61.75 1z"
          fill={color}
        />
      </svg>
    </span>
  </div>
);

AddReactionEmoji.defaultProps = {
  color: '#6a737d',
};

export default AddReactionEmoji;
