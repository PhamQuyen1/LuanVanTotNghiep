import { GoogleMap, InfoBox, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const center = {
    lat: 10.030638338881108,
    lng: 105.77042596671282
};
const containerStyle = {
    width: '700px',
    height: '500px'
};

const options = { closeBoxURL: '', enableEventPropagation: true };

function Map() {


    const [currentPositon, setCurrentPositon] = useState({});

    const handleOnClick = e => {
        console.log(e.latlng);
        console.log(e);
        console.log("latitide = ", e.latLng.lat());
        console.log("longitude = ", e.latLng.lng());
        setCurrentPositon({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        console.log(currentPositon);
    }
    return (
        <LoadScript
            googleMapsApiKey='AIzaSyDw5QHStKqtZPCAy-mnRajBUFgwCzrH0Qo'
        >
            <GoogleMap
                zoom={16}
                center={center}
                mapContainerStyle={containerStyle}
                onClick={handleOnClick}
            >
                <Marker

                    position={center}
                >
                    <InfoBox
                        options={options}
                    >
                        <>
                            <div style={{ backgroundColor: 'green', color: 'white', borderRadius: '1em', padding: '0.2em' }}>
                                someone's house
                            </div>
                        </>
                    </InfoBox>
                </Marker>
            </GoogleMap>
        </LoadScript>

    );
}

export default React.memo(Map);