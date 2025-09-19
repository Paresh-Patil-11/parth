import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Paper, TextField, Button, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, IconButton, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, Grid, InputAdornment
} from '@mui/material';
import {
  Search, Visibility, Delete, Check, Download, Refresh
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import api from '../services/api';
import { initSocket, getSocket, disconnectSocket } from '../services/socket';

const Admin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [schedules, setSchedules] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = initSocket();
    socket.emit('join-admin');
    
    socket.on('new-schedule', (schedule) => {
      enqueueSnackbar('New schedule received!', { variant: 'info' });
      fetchSchedules();
    });
    
    socket.on('schedule-updated', () => {
      fetchSchedules();
    });
    
    socket.on('schedule-deleted', () => {
      fetchSchedules();
    });
    
    fetchSchedules();
    
    return () => {
      disconnectSocket();
    };
  }, [page, rowsPerPage, searchTerm, statusFilter]);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await api.get('/schedules', {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search: searchTerm,
          status: statusFilter
        }
      });
      setSchedules(response.data.data);
      setTotalItems(response.data.pagination.totalItems);
    } catch (error) {
      enqueueSnackbar('Error fetching schedules', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/schedules/${id}`, { status });
      enqueueSnackbar('Status updated successfully', { variant: 'success' });
      fetchSchedules();
    } catch (error) {
      enqueueSnackbar('Error updating status', { variant: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await api.delete(`/schedules/${id}`);
        enqueueSnackbar('Schedule deleted successfully', { variant: 'success' });
        fetchSchedules();
      } catch (error) {
        enqueueSnackbar('Error deleting schedule', { variant: 'error' });
      }
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/schedules/export', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'schedules.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      enqueueSnackbar('Export successful', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error exporting data', { variant: 'error' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard - Schedule Management
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Status Filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={fetchSchedules}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleExport}
              >
                Export CSV
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'rgb(137,108,108)' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Phone</TableCell>
              <TableCell sx={{ color: 'white' }}>Service</TableCell>
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.map((schedule, index) => (
              <TableRow
                key={schedule.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? 'white' : 'rgb(245,250,225)'
                }}
              >
                <TableCell>{schedule.id}</TableCell>
                <TableCell>{schedule.full_name}</TableCell>
                <TableCell>{schedule.email}</TableCell>
                <TableCell>{schedule.phone}</TableCell>
                <TableCell>{schedule.service}</TableCell>
                <TableCell>{new Date(schedule.preferred_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={schedule.status}
                    color={getStatusColor(schedule.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedSchedule(schedule);
                      setViewDialog(true);
                    }}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => handleStatusUpdate(schedule.id, 'completed')}
                    disabled={schedule.status === 'completed'}
                  >
                    <Check />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(schedule.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalItems}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
      
      {/* View Details Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Schedule Details</DialogTitle>
        <DialogContent>
          {selectedSchedule && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Full Name:</Typography>
                <Typography>{selectedSchedule.full_name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Email:</Typography>
                <Typography>{selectedSchedule.email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Phone:</Typography>
                <Typography>{selectedSchedule.phone}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Date of Birth:</Typography>
                <Typography>{new Date(selectedSchedule.dob).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Birth Time:</Typography>
                <Typography>{selectedSchedule.birth_time}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Birth Place:</Typography>
                <Typography>{selectedSchedule.birth_place}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Rashi:</Typography>
                <Typography>{selectedSchedule.rashi || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Service:</Typography>
                <Typography>{selectedSchedule.service}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Preferred Date:</Typography>
                <Typography>{new Date(selectedSchedule.preferred_date).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Preferred Time:</Typography>
                <Typography>{selectedSchedule.preferred_time}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Timezone:</Typography>
                <Typography>{selectedSchedule.timezone}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Status:</Typography>
                <Chip
                  label={selectedSchedule.status}
                  color={getStatusColor(selectedSchedule.status)}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Message:</Typography>
                <Typography>{selectedSchedule.message || 'No message'}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin;