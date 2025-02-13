import React, { useEffect } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useHapioBookingStore, FullConfig } from 'hapio-ui-state-management';

interface Step {
    name?: string;
    title?: string;
    component: React.ReactNode;
}

interface ProgressHeaderProps {
    steps: Step[];
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    containerTitle: string | undefined;
    config: FullConfig;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({
    steps,
    currentStep,
    setCurrentStep,
    containerTitle,
    config,
}) => {
    const progress = ((currentStep + 1) / (steps.length - 1)) * 100;
    const resetStepData = useHapioBookingStore((state) => state.resetStepData);

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    useEffect(() => {
        resetStepData(steps[currentStep].name || '');
    }, [currentStep, resetStepData, steps]);

    return (
        <Box sx={{ marginBottom: 6 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    marginBottom: 3,
                }}
            >
                {currentStep >= 0 && currentStep < steps.length - 1 && (
                    <Typography
                        onClick={currentStep > 0 ? prevStep : undefined}
                        variant="h4"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.25,
                            fontWeight: 700,
                            backgroundColor: 'transparent',
                            color:
                                currentStep > 0
                                    ? config.theme.palette.title
                                    : config.theme.palette.disabled,
                            cursor: currentStep > 0 ? 'pointer' : 'default',
                            transition: 'color 200ms',
                            userSelect: 'none',
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="10"
                            viewBox="0 0 21 10"
                            fill="none"
                        >
                            <path
                                d="M0.575735 4.57574C0.341421 4.81005 0.341421 5.18995 0.575735 5.42426L4.39411 9.24264C4.62843 9.47696 5.00833 9.47696 5.24264 9.24264C5.47696 9.00833 5.47696 8.62843 5.24264 8.39411L1.84853 5L5.24264 1.60589C5.47696 1.37157 5.47696 0.991674 5.24264 0.757359C5.00833 0.523045 4.62843 0.523045 4.39411 0.757359L0.575735 4.57574ZM21 4.4L1 4.4V5.6L21 5.6V4.4Z"
                                fill="currentColor"
                            />
                        </svg>
                        {config.content.backButton}
                    </Typography>
                )}
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'end',
                        marginBottom: 3,
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            color: config.theme.palette.title,
                            textAlign: 'left',
                        }}
                    >
                        {containerTitle}
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            color: config.theme.palette.light,
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {config.content.stepText} {currentStep + 1} /{' '}
                        {steps.length - 1}
                    </Typography>
                </Box>

                <LinearProgress variant="determinate" value={progress} />
            </Box>
        </Box>
    );
};

export default ProgressHeader;
