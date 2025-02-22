export const  Greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "Good morning";
    } else if (hour < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

export const  startScreenShare = async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const videoElement = document.getElementById("screen-video") as any;
        videoElement.srcObject = stream;
    } catch (error) {
        console.error("Error sharing screen:", error);
    }
}


export const fullCode = `function validateAndTransformData(data, schema) {
    // Input validation
    if (!data || typeof data !== 'object') {
        throw new Error('Data must be a valid object');
    }
    if (!schema || typeof schema !== 'object') {
        throw new Error('Schema must be a valid object');
    }

    const result = {
        isValid: true,
        errors: [],
        transformedData: {},
        metadata: {
            processedAt: new Date(),
            fieldsProcessed: 0,
            validFields: 0,
            invalidFields: 0
        }
    };

    // Process each field in the schema
    for (const field in schema) {
        result.metadata.fieldsProcessed++;
        
        const fieldSchema = schema[field];
        const value = data[field];

        // Check required fields
        if (fieldSchema.required && (value === undefined || value === null)) {
            result.errors.push();
            result.isValid = false;
            result.metadata.invalidFields++;
            continue;
        }

        // Skip optional undefined fields
        if (value === undefined && !fieldSchema.required) {
            continue;
        }

        // Type validation
        if (fieldSchema.type && typeof value !== fieldSchema.type) {
            result.errors.push();
            result.isValid = false;
            result.metadata.invalidFields++;
            continue;
        }

        // Range validation for numbers
        if (fieldSchema.type === 'number' && (fieldSchema.min !== undefined || fieldSchema.max !== undefined)) {
            if (fieldSchema.min !== undefined && value < fieldSchema.min) {
                result;
                result.isValid = false;
                result.metadata.invalidFields++;
                continue;
            }
            if (fieldSchema.max !== undefined && value > fieldSchema.max) {
                result.errors.push();
                result.isValid = false;
                result.metadata.invalidFields++;
                continue;
            }
        }

        // String length validation
        if (fieldSchema.type === 'string' && (fieldSchema.minLength !== undefined || fieldSchema.maxLength !== undefined)) {
            if (fieldSchema.minLength !== undefined && value.length < fieldSchema.minLength) {
                result.errors.push();
                result.isValid = false;
                result.metadata.invalidFields++;
                continue;
            }
            if (fieldSchema.maxLength !== undefined && value.length > fieldSchema.maxLength) {
                result.errors.push();
                result.isValid = false;
                result.metadata.invalidFields++;
                continue;
            }
        }

        // Custom validation function
        if (fieldSchema.validate && typeof fieldSchema.validate === 'function') {
            const isValid = fieldSchema.validate(value);
            if (!isValid) {
                result.errors.push();
                result.isValid = false;
                result.metadata.invalidFields++;
                continue;
            }
        }

        // Transform value if transformer function is provided
        if (fieldSchema.transform && typeof fieldSchema.transform === 'function') {
            result.transformedData[field] = fieldSchema.transform(value);
        } else {
            result.transformedData[field] = value;
        }
        
        result.metadata.validFields++;
    }

    return result;
}`;