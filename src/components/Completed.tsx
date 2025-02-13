import { Box, Typography } from '@mui/material';
import { FullConfig } from 'hapio-ui-state-management';

interface CompletedProps {
    config: FullConfig;
}

const Completed: React.FC<CompletedProps> = ({ config }) => {
    return (
        <>
            <Box sx={{ maxWidth: '420px' }}>
                <Typography
                    variant="h2"
                    sx={{
                        marginBottom: '1.5rem',
                        marginTop: '3rem',
                    }}
                    color={config.theme.palette.title}
                >
                    {config.content.completedTitle}
                </Typography>
                <Typography
                    variant="body1"
                    color={config.theme.palette.secondary}
                >
                    {config.content.completedMessage}
                </Typography>
            </Box>
        </>
    );
};

export default Completed;
