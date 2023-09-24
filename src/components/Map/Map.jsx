import GoogleMap from 'google-map-react'
import map from '../../config/map'
import Place from '../Place/Place'
import { useState } from 'react'

function Map({props}) {
    let linePath
    
    const defaultProps = {
        center: {
            lat: 48.92171892900884,
            lng: 24.710412275482422
        },
        zoom: 11
    }

    const handleApiLoaded = (map, maps) => {
        linePath = new maps.Polyline({
            path: [
                {lat: 48.93651751725737, lng: 24.705031529722678},
                {lat: 48.93782496654536, lng: 24.70398530744274},
                {lat: 48.939333519324315, lng: 24.70240321521454},
            ],
            editable: true,
            strokeColor: "#FA12AA",
            strokeOpacity: 1.0,
            strokeWeight: 4,
            map: map,
        })
        linePath.setMap(map)
        map.addListener('click', mapClickHandler)
    }

    const mapClickHandler = (event) => {
        console.log(linePath, event)
        if(!linePath) return
        const path = linePath?.getPath()

        path.push(event.latLng);
    }

    const childClickHandler = (pos, data) => {
        console.log(pos, data)
    }

    const mapOption = (maps) => {
        return {
            panControl: true,
            mapTypeControl: true,
            streetViewControl:true,
        }
    }

    const changeHandler = (event) => {
        console.log(linePath)
        // const lineArr = linePath?.latLngs.g[0].g
        // if(!lineArr) return
        // console.log("\n")
        // for(let line of lineArr) {
        //     console.log(line.lat() + " | " + line.lng())
        // }
    }

    return (
        <GoogleMap
            options={mapOption}
            hoverDistance={20}
            bootstrapURLKeys={{ key: map.key }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            // onClick={mapClickHandler}
            onChildClick={childClickHandler}
            onChange={changeHandler}
        >
            <Place lat={defaultProps.center.lat} lng={defaultProps.center.lng} text={"Marker"} />
        </GoogleMap>
    )
}

export default Map;