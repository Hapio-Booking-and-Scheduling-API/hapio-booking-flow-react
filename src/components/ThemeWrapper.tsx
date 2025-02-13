import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FullConfig } from 'hapio-ui-state-management';
import React from 'react';

interface ThemeWrapperProps {
    children: React.ReactNode;
    config: FullConfig;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children, config }) => {
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 400,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        },
        typography: {
            fontFamily: config.theme.fonts.families.secondary,
            h2: {
                fontFamily: config.theme.fonts.families.primary,
                fontSize: config.theme.fonts.sizes.h2,
                fontWeight: 700,
            },
            h3: {
                fontFamily: config.theme.fonts.families.primary,
                fontSize: config.theme.fonts.sizes.h3,
                fontWeight: 700,
            },
            h4: {
                fontFamily: config.theme.fonts.families.primary,
                fontSize: config.theme.fonts.sizes.h4,
                fontWeight: 700,
            },
            h5: {
                fontFamily: config.theme.fonts.families.primary,
                fontSize: config.theme.fonts.sizes.h5,
                fontWeight: 700,
            },
            h6: {
                fontFamily: config.theme.fonts.families.primary,
                fontSize: config.theme.fonts.sizes.h6,
                fontWeight: 500,
            },
            body1: {
                fontSize: config.theme.fonts.sizes.body1,
                fontWeight: 400,
            },
            body2: {
                fontSize: config.theme.fonts.sizes.body2,
                fontWeight: 400,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        padding: '10px 16px',
                        fontSize: config.theme.fonts.sizes.body1,
                        fontWeight: '500',
                        backgroundColor: config.theme.palette.dark,
                        color: config.theme.palette.text,
                        textTransform: 'none',
                        border: 'none',
                        transition: 'all 250ms',
                        '&:hover': {
                            backgroundColor: config.theme.palette.primary,
                            color: config.theme.palette.dark,
                        },
                        '&:focus': {
                            outline: 'none',
                        },
                        '&.Mui-selected': {
                            backgroundColor: config.theme.palette.primary,
                            color: config.theme.palette.dark,
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: config.theme.palette.primary,
                            color: config.theme.palette.dark,
                            opacity: 0.85,
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputBase-input': {
                            color: config.theme.palette.input,
                        },
                        '& .MuiInputLabel-root': {
                            color: config.theme.palette.input,
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: config.theme.palette.light,
                        },
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: config.theme.palette.background,
                            '& fieldset': {
                                borderColor: config.theme.palette.light,
                                transition: 'border-color 150ms',
                            },
                            '&:hover fieldset': {
                                borderColor: config.theme.palette.light,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: config.theme.palette.light,
                            },
                        },
                    },
                },
            },
            MuiDateCalendar: {
                styleOverrides: {
                    root: {
                        backgroundColor: config.theme.palette.background,
                        color: config.theme.palette.secondary,
                        '& .MuiDayCalendar-weekDayLabel': {
                            color: config.theme.palette.title,
                            fontWeight: '400',
                            fontSize: config.theme.fonts.sizes.body1,
                        },
                        '& .MuiButtonBase-root': {
                            color: config.theme.palette.secondary,
                            borderRadius: '100%',
                            lineHeight: '1',
                        },
                        '& .MuiPickersDay-root': {
                            backgroundColor: config.theme.palette.dark,
                            color: config.theme.palette.primary,
                            fontWeight: '700',
                            fontSize: config.theme.fonts.sizes.body2,
                            transition: 'all 200ms',
                        },
                        '& .MuiPickersDay-root:hover': {
                            backgroundColor: config.theme.palette.primary,
                            color: config.theme.palette.dark,
                        },
                        '& .MuiPickersDay-root:active': {
                            backgroundColor: config.theme.palette.primary,
                            color: config.theme.palette.dark,
                        },
                        '& .MuiPickersDay-root:focus': {
                            backgroundColor: config.theme.palette.primary,
                            color: config.theme.palette.dark,
                        },
                        '& .MuiPickersDay-root:disabled.Mui-disabled': {
                            backgroundColor: config.theme.palette.background,
                            color: config.theme.palette.disabled,
                        },
                    },
                },
            },
            MuiLinearProgress: {
                styleOverrides: {
                    root: {
                        height: 4,
                        borderRadius: 5,
                        backgroundColor: config.theme.palette.background2,
                    },
                    bar: {
                        backgroundColor: config.theme.palette.primary,
                    },
                },
            },
        },
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
