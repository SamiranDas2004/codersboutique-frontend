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
    const [page, setPage] = React.useState(0);

    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = (event, reason) => {
        if (reason === 'backdropClick') return
        setOpen(false);
        setSelectedCandidate(null)
    }

    const { candidate, loading, totalPages, totalCandidates } = useSelector(state => state.candidate)
    const search = useSelector(state => state.search)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getCandidates({ ...search, page: page + 1, limit: 10 }))
    }, [dispatch, page, search])

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

    const paginationModel = { page, pageSize: 10 };

    console.log({ page, totalPages, totalCandidates })

    return (
        <>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={candidate && candidate?.length > 0 ? candidate : []}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10]}
                    onPaginationModelChange={newPage => setPage(newPage.page)}
                    sx={{ border: 0 }}
                    rowCount={totalCandidates}
                    loading={loading}
                    paginationMode='server'
                />
            </Paper>
            <Modal open={open} handleClose={handleClose} selectedCandidate={selectedCandidate} flag={edit} />
            {/* <SimpleBackdrop open={openBackDrop} /> */}
        </>
    );
}
