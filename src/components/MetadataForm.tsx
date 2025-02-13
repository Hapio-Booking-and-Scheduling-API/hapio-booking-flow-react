import { useState, useEffect } from 'react';
import {
    TextField,
    Box,
    Button,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    useHapioBookingStore,
    formatDate,
    FullConfig,
} from '@hapio/hapio-ui-state-manager';

interface MetadataFormProps {
    config: FullConfig;
}

interface MetadataFieldSettings {
    required: boolean;
    type: string;
    size?: string;
    label: string;
    placeholder: string;
    pattern?: string;
}

interface MetadataFields {
    [key: string]: MetadataFieldSettings;
}

interface Metadata {
    [key: string]: string;
}

interface BookingData {
    resource_id: string;
    service_id: string;
    location_id: string;
    metadata: Metadata;
    starts_at: string;
    ends_at: string;
}

const MetadataForm: React.FC<MetadataFormProps> = ({ config }) => {
    const metaDataFields: MetadataFields = Object.entries(
        config.settings.metaDataFields
    ).reduce((acc, [key, value]) => {
        if (value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {} as MetadataFields);

    const {
        selectedService,
        selectedLocation,
        selectedResource,
        selectedDate,
        selectedTimeSlot,
        makeBooking,
    } = useHapioBookingStore();
    const [formValues, setFormValues] = useState<Metadata>({});
    const [isFormValid, setIsFormValid] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const metadata: Metadata = {};
        Object.keys(metaDataFields).forEach((fieldKey) => {
            metadata[fieldKey] = formValues[fieldKey] || '';
        });

        const data: BookingData = {
            resource_id: selectedResource?.id || '',
            service_id: selectedService?.id || '',
            location_id: selectedLocation?.id || '',
            starts_at: selectedTimeSlot?.starts_at || '',
            ends_at: selectedTimeSlot?.ends_at || '',
            metadata,
        };

        makeBooking(data);
    };

    useEffect(() => {
        const isMetadataValid = Object.keys(metaDataFields).every(
            (fieldKey) =>
                !metaDataFields[fieldKey].required || formValues[fieldKey]
        );

        setIsFormValid(
            !!selectedLocation &&
                !!selectedService &&
                !!selectedResource &&
                !!selectedDate &&
                !!selectedTimeSlot?.starts_at &&
                !!selectedTimeSlot?.ends_at &&
                isMetadataValid
        );
    }, [
        selectedLocation,
        selectedService,
        selectedResource,
        selectedDate,
        selectedTimeSlot,
        formValues,
        metaDataFields,
    ]);

    return (
        <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ width: '100%' }}
        >
            <Box
                sx={{
                    marginBottom: '2rem',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    columnGap: '1.5rem',
                    rowGap: '0.75rem',
                    justifyContent: 'center',
                    backgroundColor: config.theme.palette.background2,
                    padding: '1.25rem',
                    borderRadius: '4px',
                    textAlign: 'left',
                }}
            >
                <Typography variant="h5" color={config.theme.palette.title}>
                    {config.content.metaDataLocationLabel}
                </Typography>
                <Typography
                    variant="body2"
                    color={config.theme.palette.secondary}
                >
                    {selectedLocation?.name}
                </Typography>

                <Typography variant="h5" color={config.theme.palette.title}>
                    {config.content.metaDataServiceLabel}
                </Typography>
                <Typography
                    variant="body2"
                    color={config.theme.palette.secondary}
                >
                    {selectedService?.name}
                </Typography>

                <Typography variant="h5" color={config.theme.palette.title}>
                    {config.content.metaDataResourceLabel}
                </Typography>
                <Typography
                    variant="body2"
                    color={config.theme.palette.secondary}
                >
                    {selectedResource?.name}
                </Typography>

                <Typography variant="h5" color={config.theme.palette.title}>
                    {config.content.metaDataDateLabel}
                </Typography>
                <Typography
                    variant="body2"
                    color={config.theme.palette.secondary}
                >
                    {selectedDate
                        ? formatDate(
                              typeof selectedDate === 'string'
                                  ? selectedDate
                                  : selectedDate.toISOString(),
                              {
                                  dateStyle: 'long',
                              }
                          )
                        : ''}
                </Typography>

                <Typography variant="h5" color={config.theme.palette.title}>
                    {config.content.metaDataTimeLabel}
                </Typography>
                <Typography
                    variant="body2"
                    color={config.theme.palette.secondary}
                >
                    {selectedTimeSlot?.starts_at
                        ? `${formatDate(selectedTimeSlot.starts_at as string, {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                          })} - ${formatDate(
                              selectedTimeSlot.ends_at as string,
                              {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: false,
                              }
                          )}`
                        : ''}
                </Typography>
            </Box>
            {config.settings.metaDataFields &&
                Object.keys(config.settings.metaDataFields).length > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '24px',
                            marginBottom: '2rem',
                        }}
                    >
                        <Typography
                            variant="h3"
                            color={config.theme.palette.title}
                            sx={{ width: '100%', textAlign: 'left' }}
                        >
                            {config.content.metaDataFieldsLabel}
                        </Typography>
                        {Object.entries(metaDataFields).map(
                            ([fieldKey, fieldSettings]) => (
                                <Box
                                    key={fieldKey}
                                    sx={{
                                        flex: isMobile
                                            ? '1 1 100%'
                                            : fieldSettings.size === 'half'
                                            ? '1 1 calc(50% - 12px)'
                                            : fieldSettings.size === 'third'
                                            ? '1 1 calc(33.333% - 16px)'
                                            : '1 1 100%',
                                    }}
                                >
                                    <TextField
                                        id={fieldKey}
                                        name={fieldKey}
                                        label={fieldSettings.label}
                                        placeholder={fieldSettings.placeholder}
                                        type={
                                            fieldSettings.type !== 'textarea'
                                                ? fieldSettings.type
                                                : undefined
                                        }
                                        slotProps={{
                                            input: {
                                                inputProps: {
                                                    pattern:
                                                        fieldSettings.pattern,
                                                },
                                            },
                                        }}
                                        multiline={
                                            fieldSettings.type === 'textarea'
                                        }
                                        rows={
                                            fieldSettings.type === 'textarea'
                                                ? 4
                                                : undefined
                                        }
                                        required={fieldSettings.required}
                                        variant="outlined"
                                        onChange={handleInputChange}
                                        value={formValues[fieldKey] || ''}
                                        sx={{
                                            backgroundColor:
                                                config.theme.palette.primary,
                                            color: config.theme.palette.input,
                                            width: '100%',
                                            borderRadius: '4px',
                                        }}
                                    />
                                </Box>
                            )
                        )}
                    </Box>
                )}

            <Button
                type="submit"
                variant="contained"
                disabled={!isFormValid}
                sx={{
                    textTransform: 'none',
                    width: '100%',
                    padding: '8px 22px',
                    fontSize: config.theme.fonts.sizes.h4,
                    fontWeight: '500',
                    backgroundColor: config.theme.palette.primary,
                    color: config.theme.palette.confirm,
                    transition: 'all 200ms',
                    '&:disabled': {
                        backgroundColor: config.theme.palette.primary,
                        opacity: 0.85,
                    },
                    '&:hover': {
                        color: config.theme.palette.confirm,
                        opacity: 0.9,
                    },
                }}
            >
                {config.content.metaDataSubmitButton}
            </Button>
        </Box>
    );
};

export default MetadataForm;
