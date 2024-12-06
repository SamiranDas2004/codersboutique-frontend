'use client';

import React from 'react';
import Appbar from '@/app/components/appbar/AppBar';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Search from '@/app/components/search/Search';
import Status from '@/app/components/status/Status';
import Date from '@/app/components/dates/Date';
import { useDispatch } from 'react-redux';
import { clearAllState } from '@/app/store/search';
import Candidates from './Candidates/Candidates';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BasicModal from '@/app/components/modal/Modal';

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = (_, reason) => {
    if (reason === 'backdropClick') return;
    setOpen(false);
  };
  const handleReset = () => {
    dispatch(clearAllState());
  };

  return (
    <>
      <Appbar />
      <Container sx={{ my: 3 }}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            borderRadius: 2,
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" textAlign="center" mb={3}>
            Candidates Assignment
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Search />
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Status />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Date label="Start Date" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Date label="End Date" />
            </Grid>
            {(isSm || isXs) ? (
              <>
                <Grid item sm={6} xs={6}>
                  <IconButton
                    onClick={handleReset}
                    sx={{
                      backgroundColor: theme.palette.grey[100],
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 7)',
                    }}
                  >
                    <RestartAltIcon />
                  </IconButton>
                </Grid>
                <Grid item sm={6} xs={6}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    width="100%"
                  >
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleOpen}
                      sx={{
                        boxShadow: '0px 4px 10px rgba(255, 165, 0, 0.4)',
                      }}
                    >
                      Add Candidate
                    </Button>
                  </Box>
                </Grid>
              </>
            ) : (
              <Grid item xs={12} sm={12} md={1} lg={1}>
                <IconButton
                  onClick={handleReset}
                  sx={{
                    backgroundColor: theme.palette.grey[100],
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <RestartAltIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
          {(isSm || isXs) ? null : (
            <Box
              mt={3}
              display="flex"
              justifyContent="flex-end"
              width="100%"
            >
              <Button
                variant="contained"
                color="warning"
                onClick={handleOpen}
                sx={{
                  boxShadow: '0px 4px 10px rgba(255, 165, 0, 0.4)',
                }}
              >
                Add Candidate
              </Button>
            </Box>
          )}
        </Paper>
        <Box
          mt={3}
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 2,
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
            padding: 3,
          }}
        >
          <Candidates />
        </Box>
      </Container>
      <BasicModal open={open} handleClose={handleClose} selectedCandidate={null} flag={false} />
    </>
  );
}
