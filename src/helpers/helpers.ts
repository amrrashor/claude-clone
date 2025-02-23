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


export const fullCode = 
`function validateAndTransformData(data, schema) {
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
    return result;
}`;

export const fullText = "In JavaScript, data validation functions play a crucial role in ensuring that user inputs meet specific requirements before processing. These functions check for correctness, completeness, and security, helping to prevent errors and vulnerabilities such as SQL injection or XSS attacks."
export const initialfullText = "In JavaScript, data validation functions play a crucial role in ensuring that user inputs meet specific requirements before processing. These functions check for correctness, completeness, and security, helping to prevent errors and vulnerabilities such as SQL injection or XSS attacks."