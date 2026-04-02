import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, Button, Dashicon, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data'; // Import useSelect to fetch data
import { store as coreStore } from '@wordpress/core-data'; // Import core store

export default function Edit({ attributes, setAttributes }) {
    const { markers } = attributes;

    // 1. Fetch pages from WordPress
    const pages = useSelect((select) => {
        return select(coreStore).getEntityRecords('postType', 'page', { per_page: -1 });
    }, []);

    // 2. Format pages for the SelectControl
    const pageOptions = [
        { label: __('Select a page...', 'map-caen'), value: '' },
        ...(pages?.map((page) => ({
            label: page.title.rendered,
            value: page.link.replace(window.location.origin + '/', ''), // Store the relative path (slug)
        })) || [])
    ];

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
            <div className="map-placeholder">
                <Dashicon icon="location-alt" />
                <p style={{ color: '#000000' }}>{__('Carte centrée sur Caen. Utilisez le sidebar pour ajouter des markers.', 'map-caen')}</p>
                <ul>
                    {markers.map((m, i) => <li key={i}>📍 {m.title || `Marker ${i + 1}`}</li>)}
                </ul>
            </div>

            <InspectorControls>
                <PanelBody title={__('Markers Management', 'map-caen')}>
                    {markers.map((marker, index) => (
                        <div key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
                            <TextControl 
                                label={__("Title", 'map-caen')}
                                value={marker.title} 
                                onChange={(val) => updateMarker(index, 'title', val)} 
                            />
                            <TextareaControl 
                                label={__("Description", 'map-caen')}
                                value={marker.desc} 
                                onChange={(val) => updateMarker(index, 'desc', val)} 
                            />
                            
                            {/* Changed from TextControl to SelectControl */}
                            <SelectControl
                                label={__("Link to Page", 'map-caen')}
                                value={marker.slug}
                                options={pageOptions}
                                onChange={(val) => updateMarker(index, 'slug', val)}
                                help={__("Choose the page this marker points to", 'map-caen')}
                            />

                            <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
                                <TextControl 
                                    label={__("Address to Geocode", 'map-caen')}
                                    value={marker.address} 
                                    onChange={(val) => updateMarker(index, 'address', val)} 
                                />
                                <Button isSecondary onClick={() => geocodeAddress(index)}>{__("Find", 'map-caen')}</Button>
                            </div>
                            <p style={{ fontSize: '10px' }}>Coords: {marker.lat}, {marker.lng}</p>
                            <Button isDestructive onClick={() => removeMarker(index)}>{__("Remove", 'map-caen')}</Button>
                        </div>
                    ))}
                    <Button isPrimary onClick={addMarker}>{__("+ Add Marker", 'map-caen')}</Button>
                </PanelBody>
            </InspectorControls>
        </div>
    );
}