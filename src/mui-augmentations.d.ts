/* eslint-disable */
import { Components } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Components<Props = {}> {
        MuiDateCalendar?: {
            defaultProps?: Partial<any>;
            styleOverrides?: {
                root?: any;
                [key: string]: any;
            };
        };
    }
}
/* eslint-enable */
