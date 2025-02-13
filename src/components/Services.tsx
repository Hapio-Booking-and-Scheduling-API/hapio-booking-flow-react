import React, { useEffect } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useHapioBookingStore, FullConfig } from 'hapio-ui-state-management';

interface ServicesProps {
    config: FullConfig;
    onSelect: () => void;
}

const Services: React.FC<ServicesProps> = ({ config, onSelect }) => {
    const {
        services,
        servicesLoading,
        selectedService,
        setSelectedService,
        fetchServices,
    } = useHapioBookingStore();

    useEffect(() => {
        if (services.length === 0) {
            fetchServices();
        }
    }, [fetchServices, services]);

    const handleChange = (serviceId: string) => {
        const foundService =
            services.find((service) => service.id === serviceId) || null;

        if (foundService) {
            setSelectedService(foundService);
            onSelect();
        } else {
            setSelectedService(null);
        }
    };

    return (
        <>
            {servicesLoading ? (
                <CircularProgress
                    sx={{ color: config.theme.palette.primary }}
                />
            ) : (
                <Grid
                    container
                    spacing={1}
                    columns={{ xs: 1, sm: 2 }}
                    sx={{ width: '100%' }}
                >
                    {services.map((service) => (
                        <Grid size={1} key={service.id}>
                            <Button
                                variant={
                                    selectedService?.id === service.id
                                        ? 'contained'
                                        : 'outlined'
                                }
                                onClick={() => handleChange(service.id)}
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
                                    {service.name}
                                </Box>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default Services;
