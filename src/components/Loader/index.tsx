import { FC } from 'react';
import ContentLoader from 'react-content-loader';

type LoaderProps = {
  className?: string;
  width: number;
  height: number;
  viewBox: string;
};

const Loader: FC<LoaderProps> = ({ className, width, height, viewBox }) => (
  <ContentLoader
    className={className}
    speed={1}
    width={width}
    height={height}
    viewBox={viewBox}
    backgroundColor="transparent"
    foregroundColor="#ededed"
  >
    <rect x="0" y="0" rx="0" ry="0" width={width} height={height} />
  </ContentLoader>
);

export default Loader;
