import React, { useEffect } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    useHapioBookingStore,
    FullConfig,
} from '@hapio/hapio-ui-state-manager';

interface LocationsProps {
    config: FullConfig;
    onSelect: () => void;
}

const Locations: React.FC<LocationsProps> = ({ config, onSelect }) => {
    const { locations, locationsLoading, setSelectedLocation, fetchLocations } =
        useHapioBookingStore();

    useEffect(() => {
        if (locations.length === 0) {
            fetchLocations();
        }
    }, [fetchLocations, locations]);

    const handleChange = (locationName: string) => {
        const foundLocation =
            locations.find((location) => location.name === locationName) ||
            null;

        if (foundLocation) {
            setSelectedLocation(foundLocation);
            onSelect();
        } else {
            setSelectedLocation(null);
        }
    };

    return (
        <>
            {locationsLoading ? (
                <CircularProgress
                    sx={{
                        color: config.theme.palette.primary,
                    }}
                />
            ) : (
                <Grid
                    container
                    spacing={1}
                    columns={{ xs: 1, sm: 2 }}
                    sx={{ width: '100%' }}
                >
                    {locations.map((location) => (
                        <Grid size={1} key={location.id}>
                            <Button
                                onClick={() => handleChange(location.name)}
                                sx={{ padding: 2, width: '100%' }}
                            >
                                <Box
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        wordBreak: 'break-all',
                                    }}
                                >
                                    {location.name}
                                </Box>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default Locations;
