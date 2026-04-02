import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, ToggleControl, Button, Dashicon } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { fields } = attributes;

    const addField = () => {
        const newFields = [...fields, { title: '', size: 'small', location: 'body' }];
        setAttributes({ fields: newFields });
    };

    const updateField = (index, key, value) => {
        const newFields = [...fields];
        newFields[index][key] = value;
        setAttributes({ fields: newFields });
    };

    const removeField = (index) => {
        const newFields = fields.filter((_, i) => i !== index);
        setAttributes({ fields: newFields });
    };

    return (
        <div {...useBlockProps()}>
            <h4>Modular Email Config</h4>
            {fields.map((field, index) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <TextControl
                        label="Input Title"
                        value={field.title}
                        onChange={(val) => updateField(index, 'title', val)}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <SelectControl
                            label="Taille"
                            value={field.size}
                            options={[
                                { label: 'Small', value: 'small' },
                                { label: 'Large (Textarea)', value: 'large' }
                            ]}
                            onChange={(val) => updateField(index, 'size', val)}
                        />
                        <SelectControl
                            label="Emplacement"
                            value={field.location}
                            options={[
                                { label: 'Header', value: 'header' },
                                { label: 'Body', value: 'body' }
                            ]}
                            onChange={(val) => updateField(index, 'location', val)}
                        />
                        <ToggleControl
                            label={ __("Requis?") }
                            checked={ field.required }
                            onChange={ (val) => updateField(index, 'required', val) }
                        />
                        <Button isDestructive onClick={() => removeField(index)}>
                            <Dashicon icon="trash" />
                        </Button>
                    </div>
                </div>
            ))}
            <Button isPrimary onClick={addField}>Add New Input</Button>
        </div>
    );
}