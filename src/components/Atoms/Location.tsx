import React from 'react';

import { MapPinIcon } from '@heroicons/react/24/outline';
import { truncateString } from '../../ulities/Stringhandle';
import type { ImageProps, ButtonProps } from "@relume_io/relume-ui";

type Props = {
    location?: string;
}
const LocationDisplay: React.FC<Props> = (props) => {
    const location = truncateString(props.location || '',20);
  return (
    <div className="flex items-center space-x-2">
      <MapPinIcon className="h-5 w-5 text-black" />
      <span className="text-black">{location}</span>
    </div>
  );
};
LocationDisplay.defaultProps = {
    location : "Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000"
}
export default LocationDisplay;
