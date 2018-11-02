import React from 'react';

const Message = ({message}) => {
	return (
		<div className="card mb-3 mt-3 shadow-sm border-light">
			<div className="card-body">
				<div className="text-center">
					{message}
				</div>
			</div>
		</div>
	)
};

export default Message;
