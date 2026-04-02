import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, RangeControl, Button } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
    const { imgOneUrl, imgTwoUrl, sliderValue } = attributes;

    const containerStyle = {
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        backgroundColor: '#eee'
    };

    const imageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        userSelect: 'none'
    };

    return (
        <div { ...useBlockProps() }>
            <InspectorControls>
                <PanelBody title="Slider Settings">
                    <RangeControl
                        label="Initial Position"
                        value={ sliderValue }
                        onChange={ ( val ) => setAttributes( { sliderValue: val } ) }
                        min={ 0 }
                        max={ 100 }
                    />
                </PanelBody>
            </InspectorControls>

            {/* The Visual Container */}
            <div className="slider-container" style={ containerStyle }>
                {/* Bottom Image (Original) */}
                { imgOneUrl && <img src={ imgOneUrl } style={ imageStyle } alt="Before" /> }
                
                {/* Top Image (Comparison) - This one gets clipped */}
                { imgTwoUrl && (
                    <img 
                        src={ imgTwoUrl } 
                        style={{ 
                            ...imageStyle, 
                            clipPath: `inset(0 0 0 ${sliderValue}%)` 
                        }} 
                        alt="After" 
                    />
                ) }

                {/* The Visual Line */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${sliderValue}%`,
                    width: '4px',
                    background: 'white',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                }}></div>
            </div>

            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={ ( media ) => setAttributes( { imgOneUrl: media.url } ) }
                        render={ ( { open } ) => <Button isSecondary onClick={ open }>Image Avant</Button> }
                    />
                    <MediaUpload
                        onSelect={ ( media ) => setAttributes( { imgTwoUrl: media.url } ) }
                        render={ ( { open } ) => <Button isSecondary onClick={ open }>Image Aprés</Button> }
                    />
                </MediaUploadCheck>
            </div>
        </div>
    );
}