import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Save } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidates } from '@/app/store/candidate'
import Modal from '@/app/components/modal/Modal'
import SimpleBackdrop from '@/app/components/backdrop/Backdrop';
import useResponsiveWidth from '@/app/hooks/useResponsiveWidth';

export default function CandidatesData() {
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [selectedCandidate, setSelectedCandidate] = React.useState(null)

    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const handleCloseBackDrop = () => {
        setOpenBackDrop(false);
    };
    const handleOpenBackDrop = () => {
        setOpenBackDrop(true);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = (event, reason) => {
        if (reason === 'backdropClick') return
        setOpen(false);
        setSelectedCandidate(null)
    }

    const { candidate, loading } = useSelector(state => state.candidate)
    const search = useSelector(state => state.search)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getCandidates(search))
    }, [dispatch, search])

    React.useEffect(() => {
        if (loading) setOpenBackDrop(true)
        else setOpenBackDrop(false)
    }, [loading])

    const columns = [
        { field: 'name', headerName: 'Name', width: useResponsiveWidth(300, 300, 250, 200, 135), },
        {
            field: 'status',
            headerName: 'Assignment Status',
            width: useResponsiveWidth(300, 300, 270, 200, 135),
        },
        {
            field: 'date',
            headerName: 'Assignment Date',
            width: useResponsiveWidth(300, 300, 270, 200, 135),
            valueGetter: (params) => params.split('T')[0],
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: useResponsiveWidth(300, 300, 250, 200, 135),
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Tooltip title='Edit'>
                        <IconButton color="primary" onClick={() => {
                            setEdit(true)
                            handleOpen()
                            setSelectedCandidate(params.row)
                        }}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    const paginationModel = { page: 0, pageSize: 10 };

    return (
        <>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={candidate && candidate?.length > 0 ? candidate : []}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
            <Modal open={open} handleClose={handleClose} selectedCandidate={selectedCandidate} flag={edit} />
            <SimpleBackdrop open={openBackDrop} />
        </>
    );
}
