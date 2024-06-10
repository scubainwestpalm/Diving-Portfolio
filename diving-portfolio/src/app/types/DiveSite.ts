interface DiveSite {
    id: number;
    name: string;
    description: string;
    coordinates: {
        lat: number,
        long: number
    };
    thumbnailPath: string;
    region: string;
}