
export default async function cloudinaryUpload(file) {
        const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
        const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
        // Cloudinary upload parameters
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset); // set this in Cloudinary settings
        formData.append("api_key", apiKey); // Cloudinary API key
        formData.append("timestamp", Math.floor(Date.now() / 1000)); // Unix timestamp

        // Make the request to Cloudinary's upload endpoint
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Cloudinary upload failed");
        }

        return await response.json();
    }
