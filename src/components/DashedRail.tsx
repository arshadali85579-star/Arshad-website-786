import React from 'react';

interface DashedRailProps {
  dark?: boolean;
}

export const DashedRail: React.FC<DashedRailProps> = ({ dark = false }) => {
  return (
    <>
      <div
        className={`nx-dashed-rail nx-dashed-rail--left hidden xl:block ${
          dark ? 'nx-dashed-rail--dark' : ''
        }`}
        aria-hidden="true"
      />
      <div
        className={`nx-dashed-rail nx-dashed-rail--right hidden xl:block ${
          dark ? 'nx-dashed-rail--dark' : ''
        }`}
        aria-hidden="true"
      />
    </>
  );
};
