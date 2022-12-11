import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect
      x="535"
      y="230"
      rx="3"
      ry="3"
      width="88"
      height="6"
    />
    <circle
      cx="95"
      cy="95"
      r="95"
    />
    <rect
      x="448"
      y="514"
      rx="0"
      ry="0"
      width="185"
      height="30"
    />
    <rect
      x="7"
      y="220"
      rx="10"
      ry="10"
      width="185"
      height="64"
    />
    <rect
      x="5"
      y="304"
      rx="0"
      ry="0"
      width="77"
      height="40"
    />
    <rect
      x="92"
      y="299"
      rx="20"
      ry="20"
      width="104"
      height="49"
    />
  </ContentLoader>
);