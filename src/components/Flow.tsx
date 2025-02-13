import React, { useEffect, useState, useRef, useMemo } from 'react';
import mergeWith from 'lodash.mergewith';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import HapioConfigJson from '../../hapio.config.json';
import {
    useHapioBookingStore,
    FullConfig,
    UserConfig,
    localeMap,
} from 'hapio-ui-state-management';
import ComponentContainer from './ComponentContainer';
import ProgressHeader from './ProgressHeader';
import Calendar from './Calendar';
import Locations from './Locations';
import Services from './Services';
import Resources from './Resources';
import TimeSlots from './TimeSlots';
import MetadataForm from './MetadataForm';
import Completed from './Completed';
import HapioBranding from './HapioBranding';
import ThemeWrapper from './ThemeWrapper';

interface Step {
    name: string;
    title: string;
    component: React.ReactNode;
}

interface FlowProps {
    config: UserConfig;
}

const Flow: React.FC<FlowProps> = ({ config }) => {
    const mergedConfig = useMemo(() => {
        const mergeCustomizer = (
            _objValue: unknown,
            srcValue: unknown,
            key: string
        ): unknown => {
            if (key === 'metaDataFields') {
                return srcValue;
            }
        };

        const merged = mergeWith({}, HapioConfigJson, config, mergeCustomizer);
        return merged as unknown as FullConfig;
    }, [config]);

    const {
        fetchLocations,
        selectedLocation,
        singleLocation,
        fetchServices,
        selectedService,
        singleService,
        fetchResources,
        selectedResource,
        singleResource,
        selectedDate,
        selectedTimeSlot,
        bookingResult,
        setConfig,
    } = useHapioBookingStore();

    useEffect(() => {
        setConfig(mergedConfig);
    }, [mergedConfig, setConfig]);

    const [locale, setLocale] = useState<Locale | null>(null);
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

    const hasFetchedData = useRef(false);

    // Load locale on component mount
    useEffect(() => {
        const loadLocale = () => {
            const localeCode = mergedConfig.settings.locale!.trim();
            const selectedLocale = localeMap[localeCode];

            if (selectedLocale) {
                setLocale(selectedLocale);
            } else {
                const fallbackLocale = localeMap['en-GB'];
                setLocale(fallbackLocale);
            }
        };

        loadLocale();
    }, [mergedConfig]);

    const nextStep = () => {
        setCurrentStep((prev) => {
            const newStep = Math.min(prev + 1);
            return newStep;
        });
    };

    // Fetch data only once and only fetch missing data
    useEffect(() => {
        if (hasFetchedData.current) return;
        hasFetchedData.current = true;

        const loadData = async () => {
            const fetchPromises = [];

            if (!selectedLocation) {
                fetchPromises.push(fetchLocations());
            }

            if (!selectedService) {
                fetchPromises.push(fetchServices());
            }

            if (!selectedResource) {
                fetchPromises.push(fetchResources());
            }

            try {
                await Promise.all(fetchPromises);
                setIsDataLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
                // TODO: Handle errors
            }
        };

        loadData();
    }, [
        fetchLocations,
        fetchServices,
        fetchResources,
        selectedLocation,
        selectedService,
        selectedResource,
        singleLocation,
        singleService,
        singleResource,
    ]);

    // Build steps based on initial selections after data is loaded
    useEffect(() => {
        if (!isDataLoaded) return;

        const stepsArray: Step[] = [];

        const addStep = (selected: boolean, step: Step, single?: boolean) => {
            if (selected && !single) {
                nextStep();
            }
            if (!single) {
                stepsArray.push(step);
            }
        };

        addStep(
            !!selectedLocation,
            {
                name: 'location',
                title: mergedConfig.content.locationTitle,
                component: (
                    <Locations onSelect={nextStep} config={mergedConfig} />
                ),
            },
            singleLocation
        );

        addStep(
            !!selectedService,
            {
                name: 'service',
                title: mergedConfig.content.serviceTitle,
                component: (
                    <Services onSelect={nextStep} config={mergedConfig} />
                ),
            },
            singleService
        );

        addStep(
            !!selectedResource,
            {
                name: 'resource',
                title: mergedConfig.content.resourceTitle,
                component: (
                    <Resources onSelect={nextStep} config={mergedConfig} />
                ),
            },
            singleResource
        );

        addStep(!!selectedDate, {
            name: 'calendar',
            title: mergedConfig.content.dateTitle,
            component: <Calendar onSelect={nextStep} />,
        });

        addStep(!!selectedTimeSlot, {
            name: 'timeSlot',
            title: mergedConfig.content.timeSlotTitle,
            component: <TimeSlots onSelect={nextStep} config={mergedConfig} />,
        });

        stepsArray.push(
            {
                name: 'metaDataForm',
                title: mergedConfig.content.metaDataFormTitle,
                component: <MetadataForm config={mergedConfig} />,
            },
            {
                name: 'completed',
                title: mergedConfig.content.completedTitle,
                component: <Completed config={mergedConfig} />,
            }
        );

        setSteps(stepsArray);
    }, [isDataLoaded]);

    // Navigate to the Completed step if a booking is already completed
    useEffect(() => {
        if (bookingResult && bookingResult.finalized_at) {
            setCurrentStep(steps.length - 1);
        }
    }, [bookingResult, steps.length]);

    if (!isDataLoaded) {
        return <div>Loading...</div>;
    }

    if (steps.length === 0) {
        return <div>No components available.</div>;
    }

    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={locale}
        >
            <ThemeWrapper config={mergedConfig}>
                <ComponentContainer config={mergedConfig}>
                    {currentStep < steps.length - 1 && (
                        <ProgressHeader
                            steps={steps}
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                            containerTitle={steps[currentStep].title}
                            config={mergedConfig}
                        />
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '400px',
                        }}
                    >
                        {steps[currentStep]?.component}
                    </Box>
                    <HapioBranding config={mergedConfig} />
                </ComponentContainer>
            </ThemeWrapper>
        </LocalizationProvider>
    );
};

export default Flow;
