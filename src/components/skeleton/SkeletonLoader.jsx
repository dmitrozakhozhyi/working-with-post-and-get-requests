import './skeletonLoader.sass';
import Spinner from '../spiner/Spinner';

const SkeletonLoader = ({ count }) => {
  const skeletonItems = Array.from({ length: count }, (_, index) => (
    <div key={index} className="skeleton-loader">
      <Spinner />
    </div>
  ));

  return <>{skeletonItems}</>;
};

export default SkeletonLoader;
