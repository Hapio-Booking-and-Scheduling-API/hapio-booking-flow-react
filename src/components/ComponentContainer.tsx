import { Box } from '@mui/material';
import { FullConfig } from 'hapio-ui-state-management';

interface ComponentContainerProps {
    children?: React.ReactNode;
    config: FullConfig;
}

const ComponentContainer: React.FC<ComponentContainerProps> = ({
    children,
    config,
}) => {
    return (
        <Box
            sx={{
                borderRadius: 3,
                bgcolor: config.theme.palette.background,
                width: '100%',
                maxWidth: '660px',
            }}
        >
            {children ? (
                <Box sx={{ padding: 'clamp(24px, 0.7241rem + 2.069vw, 48px)' }}>
                    {children}
                </Box>
            ) : null}
        </Box>
    );
};

export default ComponentContainer;
