import React from 'react';

const GoogleMapSection = ({ listing, coordinates }) => {
    return (
        <div>
            <div>{JSON.stringify(listing)}</div>
            <div>{JSON.stringify(coordinates)}</div>
            <div></div>
        </div>
    );
};

export default GoogleMapSection;
