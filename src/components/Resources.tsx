import React, { useEffect } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useHapioBookingStore, FullConfig } from 'hapio-ui-state-management';

interface ResourcesProps {
    config: FullConfig;
    onSelect: () => void;
}

const Resources: React.FC<ResourcesProps> = ({ config, onSelect }) => {
    const { resources, resourcesLoading, setSelectedResource, fetchResources } =
        useHapioBookingStore();

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    const handleChange = (resourceId: string) => {
        const foundResource =
            resources.find((resource) => resource.id === resourceId) || null;

        if (foundResource) {
            setSelectedResource(foundResource);
            onSelect();
        } else {
            setSelectedResource(null);
        }
    };

    return (
        <>
            {resourcesLoading ? (
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
                    sx={{
                        width: '100%',
                        justifyContent:
                            resources.length < 2 ? 'center' : 'flex-start',
                    }}
                >
                    {resources.map((resource) => (
                        <Grid size={1} key={resource.id}>
                            <Button
                                onClick={() => handleChange(resource.id)}
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
                                    {resource.name}
                                </Box>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default Resources;
