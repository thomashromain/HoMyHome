import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, Button, Dashicon } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { markers } = attributes;

    const addMarker = () => {
        const newMarkers = [...markers, { title: '', desc: '', slug: '', lat: 49.18, lng: -0.37, address: '' }];
        setAttributes({ markers: newMarkers });
    };

    const updateMarker = (index, key, value) => {
        const newMarkers = [...markers];
        newMarkers[index][key] = value;
        setAttributes({ markers: newMarkers });
    };

    const removeMarker = (index) => {
        const newMarkers = markers.filter((_, i) => i !== index);
        setAttributes({ markers: newMarkers });
    };

    // Example Geocoding Function (using Nominatim - Free)
    const geocodeAddress = async (index) => {
        const address = markers[index].address;
        if (!address) return;

        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        
        if (data && data[0]) {
            updateMarker(index, 'lat', parseFloat(data[0].lat));
            updateMarker(index, 'lng', parseFloat(data[0].lon));
        }
    };

    return (
        <div {...useBlockProps()}>
            {/* The Editor Canvas View: Simple Placeholder */}
            <div className="map-placeholder">
                <Dashicon icon="location-alt" />
                <p style={{ color: '#000000' }}>{__('Carte centré sur Caen. Utiliser le sidebar pour ajouter des markers.', 'text-domain')}</p>
                <ul>
                    {markers.map((m, i) => <li key={i}>📍 {m.title || `Marker ${i + 1}`}</li>)}
                </ul>
            </div>

            {/* The Sidebar Controls */}
            <InspectorControls>
                <PanelBody title={__('Markers Management', 'text-domain')}>
                    {markers.map((marker, index) => (
                        <div key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
                            <TextControl 
                                label="Title" 
                                value={marker.title} 
                                onChange={(val) => updateMarker(index, 'title', val)} 
                            />
                            <TextareaControl 
                                label="Description" 
                                value={marker.desc} 
                                onChange={(val) => updateMarker(index, 'desc', val)} 
                            />
                            <TextControl 
                                label="Slug (URL Redirect)" 
                                value={marker.slug} 
                                onChange={(val) => updateMarker(index, 'slug', val)} 
                            />
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
                                <TextControl 
                                    label="Address to Geocode" 
                                    value={marker.address} 
                                    onChange={(val) => updateMarker(index, 'address', val)} 
                                />
                                <Button isSecondary onClick={() => geocodeAddress(index)}>Find</Button>
                            </div>
                            <p style={{ fontSize: '10px' }}>Coords: {marker.lat}, {marker.lng}</p>
                            <Button isDestructive onClick={() => removeMarker(index)}>Remove</Button>
                        </div>
                    ))}
                    <Button isPrimary onClick={addMarker}>+ Add Marker</Button>
                </PanelBody>
            </InspectorControls>
        </div>
    );
}