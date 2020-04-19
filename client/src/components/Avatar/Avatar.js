import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Avatar = ({
  imageSrc = require('../../assets/img/default-avatar.png'),
  size,
  className,
  onClick,
  style,
}) => {
  const avatarClasses = classNames({
    avatar: true,
    [className]: className,
  });

  return (
    <div
      style={size && { width: size, height: size }}
      className={avatarClasses}
      onClick={onClick}
      style={style}
    >
      <img
        style={size && { width: size, height: size }}
        src={imageSrc}
        alt="Avatar"
      />
    </div>
  );
};

Avatar.propTypes = {
  imageSrc: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;
