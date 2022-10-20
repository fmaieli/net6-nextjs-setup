/**
 * @type {import('next').NextConfig}
 */
const rewrites = () => {
    return process.env.NODE_ENV === "development" ?
        [
            {
                source: "/api/:path*",
                destination: "http://localhost:5000/api/:path*",
            },
        ] : [];
};

const nextConfig = {
    images: {
        loader: 'akamai',
        path: '/',
    },
    basePath: '',
    rewrites,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/almacenamiento/solidos',
                permanent: true,
            }
        ];
    }
}

module.exports = nextConfig