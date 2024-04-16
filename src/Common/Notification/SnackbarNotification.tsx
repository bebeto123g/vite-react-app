import { Alert, Snackbar } from '@mui/material';

export const SnackbarNotification = () => {
    const handleClose = () => {
        console.log('handleClose');
    };

    return (
        <Snackbar
            open={true}
            autoHideDuration={6000}
            // onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                This is a success Alert inside a Snackbar!
            </Alert>
        </Snackbar>
    );
};
