import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { fields } = attributes;

    return (
        <div {...useBlockProps.save()}>
            <form className="modular-email-form">
                {fields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label>{field.title}</label>
                        {field.size === 'large' ? (
                            <textarea 
                                data-title={field.title} 
                                data-location={field.location} 
                                className="email-input"
                                required={field.required}
                            />
                        ) : (
                            <input 
                                type="text" 
                                data-title={field.title} 
                                data-location={field.location} 
                                className="email-input"
                                required={field.required}
                            />
                        )}
                    </div>
                ))}
                <p className='required-indication'>Indique les champs obligatoires</p>
                <button type="submit" className="send-button">Envoyer</button>
                <div className="response-msg"></div>
            </form>
        </div>
    );
}