import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, MenuItem, TextField, Select, IconButton, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addCandidate, editCandidates } from '@/app/store/candidate';
import { Close } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
};

export default function BasicModal({ open, handleClose, selectedCandidate, flag }) {
    const [name, setName] = React.useState(selectedCandidate?.name || '')
    const [status, setStatus] = React.useState(selectedCandidate?.status || '')

    const { loading } = useSelector(state => state.candidate);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (flag) {
            setName(selectedCandidate?.name)
            setStatus(selectedCandidate?.status)
        }
        return () => {
            setName('')
            setStatus('')
        }
    }, [flag, open, selectedCandidate])

    const handleEdit = async () => {
        if (flag) {
            dispatch(editCandidates({ id: selectedCandidate.id, status }))
        }
        else dispatch(addCandidate({ name }))
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
                            {flag ? 'Update Candidate' : "Add Candidate"}
                        </Typography>
                        <Box display={'flex'} justifyContent={'flex-end'} width={'50%'}>
                            <IconButton onClick={handleClose} disabled={loading}>
                                <Close />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box mt={2}>
                        <TextField sx={{ my: 1 }} name='name' fullWidth label={'name'}
                            value={name}
                            onChange={e => setName(e.target.value)} disabled={loading || flag}
                        />
                        {
                            flag &&
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={e => setStatus(e.target.value)}
                                >
                                    <MenuItem value={'Pending'}>Pending</MenuItem>
                                    <MenuItem value={'In Progress'}>In Progress</MenuItem>
                                    <MenuItem value={'Completed'}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        }
                        <Box display={'flex'} justifyContent={"center"} mt={2}>
                            <Button startIcon={loading ? <CircularProgress size={15} /> : null} variant='outlined' color='error' disabled={loading} onClick={handleEdit}>Save</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
