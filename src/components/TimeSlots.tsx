import React, { useEffect } from 'react';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    useHapioBookingStore,
    formatDate,
    FullConfig,
} from '@hapio/hapio-ui-state-manager';

interface TimeSlotsProps {
    config: FullConfig;
    onSelect: () => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ config, onSelect }) => {
    const {
        selectedService,
        selectedLocation,
        selectedResource,
        selectedDate,
        timeslots,
        timeslotsLoading,
        selectedTimeSlot,
        fetchTimeslots,
        setSelectedTimeSlot,
    } = useHapioBookingStore();

    useEffect(() => {
        fetchTimeslots();
    }, [
        selectedService,
        selectedLocation,
        selectedResource,
        selectedDate,
        fetchTimeslots,
    ]);

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newChoice: string | null
    ) => {
        if (newChoice === null) {
            setSelectedTimeSlot(null);
            return;
        }

        const selectedTimeslot = timeslots.find(
            (timeslot) => timeslot.starts_at === newChoice
        );

        if (selectedTimeslot) {
            setSelectedTimeSlot({
                starts_at: selectedTimeslot.starts_at,
                ends_at: selectedTimeslot.ends_at,
            });
            onSelect();
        } else {
            setSelectedTimeSlot(null);
        }
    };

    if (
        !selectedService ||
        !selectedLocation ||
        !selectedResource ||
        !selectedDate
    ) {
        return (
            <Typography
                variant="h3"
                color={config.theme.palette.error}
                sx={{ maxWidth: '400px' }}
            >
                {config.content.timeSlotErrorTextMissingData}
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}
        >
            {timeslotsLoading ? (
                <CircularProgress
                    sx={{ color: config.theme.palette.primary }}
                />
            ) : timeslots.length === 0 ? (
                <Typography
                    variant="h3"
                    color={config.theme.palette.error}
                    sx={{ maxWidth: '400px' }}
                >
                    {config.content.timeSlotErrorTextNoResults}
                </Typography>
            ) : (
                <Grid
                    container
                    sx={{
                        maxWidth: '400px',
                        width: '100%',
                        justifyContent:
                            timeslots.length < 5 ? 'center' : 'flex-start',
                    }}
                    spacing={1}
                    columns={{ xs: 4, sm: 5 }}
                >
                    {timeslots
                        .filter((timeslot) => timeslot.starts_at !== null)
                        .map((timeslot) => (
                            <Grid size={1} key={timeslot.starts_at}>
                                <Button
                                    variant={
                                        selectedTimeSlot?.starts_at ===
                                        timeslot.starts_at
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    onClick={(event) =>
                                        handleChange(
                                            event,
                                            timeslot.starts_at as string
                                        )
                                    }
                                    sx={{ width: '100%' }}
                                >
                                    {formatDate(timeslot.starts_at as string, {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                        timeZone: config.settings.timezone,
                                    })}
                                </Button>
                            </Grid>
                        ))}
                </Grid>
            )}
        </Box>
    );
};

export default TimeSlots;
