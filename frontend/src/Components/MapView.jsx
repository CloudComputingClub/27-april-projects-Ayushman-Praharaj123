import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const OSM_STYLE = {
    version: 8,
    sources: {
        osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    },
    layers: [
        {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19
        }
    ]
}

const MapView = ({ className = '', center = [77.2090, 28.6139], zoom = 13, markers = [] }) => {
    const containerRef = useRef(null)
    const mapRef = useRef(null)
    const markerRefs = useRef([])

    useEffect(() => {
        if (mapRef.current) return

        mapRef.current = new maplibregl.Map({
            container: containerRef.current,
            style: OSM_STYLE,
            center,
            zoom
        })

        mapRef.current.addControl(new maplibregl.NavigationControl(), 'top-right')

        mapRef.current.addControl(
            new maplibregl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                trackUserLocation: true,
                showUserHeading: true
            }),
            'top-right'
        )

        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (!mapRef.current) return

        markerRefs.current.forEach(m => m.remove())
        markerRefs.current = []

        markers.forEach(({ lng, lat, color = '#111827' }) => {
            const el = document.createElement('div')
            el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);`
            const marker = new maplibregl.Marker({ element: el })
                .setLngLat([lng, lat])
                .addTo(mapRef.current)
            markerRefs.current.push(marker)
        })
    }, [markers])

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ width: '100%', height: '100%' }}
        />
    )
}

export default MapView
