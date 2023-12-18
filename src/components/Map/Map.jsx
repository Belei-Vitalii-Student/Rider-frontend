import GoogleMap from 'google-map-react'
import map from '../../config/map'
import Place from '../Place/Place'
import { useEffect, useState } from 'react'

function Map(props) {
    let linePath
    // console.log(props)

    const defaultProps = {
        center: { lat: 48.9354547453022, lng: 24.700544141400652 },
        zoom: 16
    }

    const handleApiLoaded = (map, maps) => {
        linePath = new maps.Polyline({
            path: [
                { lat: 48.93788451042859, lng: 24.703911612301187 },
                { lat: 48.93552459474604, lng: 24.700922418169913 }
            ],
            type: "primary",
            editable: true,
            strokeColor: "#FA12AA",
            strokeOpacity: 1.0,
            strokeWeight: 4,
            map: map,
        })
        linePath.setMap(map)
        map.addListener('click', mapClickHandler)



        const start = { lat: 48.94272994323551, lng: 24.697135652947747 };
        const end = { lat: 48.9354547453022, lng: 24.700544141400652 };

        // Створити об'єкт DirectionsService
        const directionsService = new maps.DirectionsService();
        const directionsRenderer = new maps.DirectionsRenderer()
        directionsRenderer.setMap(map)

        // Створити об'єкт DirectionsRequest
        const customPath = [
            { lat: 48.93788451042859, lng: 24.703911612301187 },
            { lat: 48.93552459474604, lng: 24.700922418169913 }
        ];

        const routeSegments = customPath.map(point => ({
            location: new maps.LatLng(point.lat, point.lng)
        }));

        const directionsRequest = {
            origin: start,
            destination: end,
            travelMode: maps.TravelMode.WALKING,
            waypoints: routeSegments
        };

        console.log(directionsService)

        // Запросити маршрут
        directionsService.route(directionsRequest, (response, status) => {
        // Обробити результат
        if (status === maps.DirectionsStatus.OK) {
            console.log(response);
            directionsRenderer.setDirections(response)
        }
        });
    }

    const mapClickHandler = (event) => {
        // console.log(linePath, event)
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
        // console.log(linePath)
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