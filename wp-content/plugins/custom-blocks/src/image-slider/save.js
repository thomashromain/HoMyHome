import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
    const { imgOneUrl, imgTwoUrl, sliderValue } = attributes;
    
    return (
        <div { ...useBlockProps.save() }>
            <div 
                className="wp-block-image-slider-visual" 
                style={{ '--position': `${sliderValue}%` }}
            >
                <img src={ imgOneUrl } className="img-before" alt="Before" />
                <img src={ imgTwoUrl } className="img-after" alt="After" />
                
                {/* The actual draggable element */}
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={ sliderValue } 
                    className="slider-input" 
                />
                <div className="slider-line"></div>
            </div>
        </div>
    );
}