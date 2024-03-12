import React from 'react';
import PropTypes from 'prop-types';

function TabScreenIcons({
  Icon,
  focused,
}) {
  return (
    <Icon
      fill={focused ? 'blue' : '#002059'}
      height={focused ? '26' : '30'}
      width={focused ? '26' : '30'}
    />
  );
}

TabScreenIcons.propTypes = {
  focused: PropTypes.bool.isRequired,
  Icon: PropTypes.elementType.isRequired,
};
export default TabScreenIcons;
