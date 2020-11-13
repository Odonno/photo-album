module.exports = {
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		domains: ['<YOUR_AZURE_BLOB_STORAGE_DOMAIN>'], // ex: saphotoalbum.blob.core.windows.net
		path: '/_next/image',
		loader: 'default',
	},
	env: {
		PHOTO_ALBUM_API_URL: '<YOUR_BACKEND_URL>', // ex: https://localhost:5001
	},
};
