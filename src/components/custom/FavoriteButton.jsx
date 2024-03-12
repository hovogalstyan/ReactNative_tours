import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Favorite, FavoriteActive } from '../../assets';
import { activeOption } from '../../assets/styles/globalStyles';

function FavoriteButton({
  active,
  ...props
}) {
  return (
    <TouchableOpacity
      activeOpacity={activeOption}
      {...props}
    >
      {
       active ? <FavoriteActive fill="red" /> : <Favorite />
      }
    </TouchableOpacity>
  );
}

FavoriteButton.propTypes = {
  active: PropTypes.bool.isRequired,
};
export default FavoriteButton;
