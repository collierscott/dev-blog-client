import React  from 'react';

const LoadMore = ({label, disabled, onClick}) => {
    return (
      <button className="btn btn-block btn-dark" disabled={disabled} onClick={onClick}>
        {label}
      </button>
    )
};

export default LoadMore;