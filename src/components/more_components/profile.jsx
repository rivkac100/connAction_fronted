import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Navigation } from './navigation';
import './profile.css';
import { useNavigate, useParams } from 'react-router-dom';
import { m } from 'framer-motion';
import { managersFetchThunkById } from '../../store/slices/managers/managerFetchThunkById';
// import { useDispatch } from 'react-redux';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.mid;
  const refDialog = useRef();
  const manager = useSelector((state) => state.manager.myManager);
  const [editing, setEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // This would normally come from your Redux store
  const [profile, setProfile] = useState({
    name: manager.managerName,
    email: manager.managerEmail,
    phone: manager.managerPhone,
    address: manager.address,
    bio: manager.description,
    // website: 'www.sarahcohen.co.il',
    // socialMedia: {
    //   facebook: 'facebook.com/sarahcohen',
    //   instagram: 'instagram.com/sarah_cohen',
    //   linkedin: 'linkedin.com/in/sarahcohen'
    // }
  });
  useEffect(() => {
    if (!manager.id) {
      dispatch(managersFetchThunkById({ id: params.mid }));
    }
    refDialog.current.showModal();
  }, []);
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would dispatch an action to update the profile in your backend
    // For now, we'll just update the local state
    setProfile(formData);
    setEditing(false);

    setSnackbar({
      open: true,
      message: 'הפרופיל עודכן בהצלחה',
      severity: 'success'
    });
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setEditing(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <dialog ref={refDialog}>
      {/* <Navigation managerId={id} managerName={profile.name} /> */}
      <Container maxWidth="md" className="profile-container">
        <Paper className="profile-paper">
          <Box className="profile-header">
            <IconButton
              className="back-button"
              onClick={() => navigate(`/manager/${id}`)}
            >

              <ArrowBackIcon />
            </IconButton>

            <Typography variant="h5" className="profile-title">
              פרופיל אישי
            </Typography>
            {!editing ? (<>
              {!params.id &&
                <IconButton
                  className="edit-button"
                  onClick={() => setEditing(true)}
                >
                  <EditIcon />
                </IconButton>
              }
              <IconButton
                className="edit-button"
                onClick={() => { navigate(-1); refDialog.current.close(); }}

              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                className="back-button"
                onClick={() => { navigate(-1); refDialog.current.close(); }}
              >

                <ArrowBackIcon />

              </IconButton></>
            ) : (
              <Box className="edit-actions">
                <IconButton
                  className="save-button"
                  onClick={handleSubmit}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  <CancelIcon />
                </IconButton>
                <IconButton
                  className="edit-button"
                  onClick={() => { navigate(-1); refDialog.current.close(); }}
                >
                  <ArrowBackIcon />

                </IconButton>
              </Box>
            )}
          </Box>

          <Divider />

          <Box className="profile-content">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} className="profile-avatar-section">
                <Avatar className="profile-avatar">
                  {profile.name.charAt(0).toUpperCase()}
                </Avatar>
                {!editing && (
                  <Typography variant="h6" className="profile-name">
                    {profile.name}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={8}>
                <form className="profile-form">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="שם"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!editing}
                        variant={editing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !editing,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="אימייל"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!editing}
                        variant={editing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !editing,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="טלפון"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!editing}
                        variant={editing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !editing,
                        }}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="אתר אינטרנט"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        disabled={!editing}
                        variant={editing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !editing,
                        }}
                      />
                    </Grid> */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="כתובת"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!editing}
                        variant={editing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !editing,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="אודות"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={!editing}
                        variant={editing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !editing,
                        }}
                        multiline
                        rows={4}
                      />
                    </Grid>

                    {/* <Grid item xs={12}>
                      <Typography variant="h6" className="social-media-title">
                        רשתות חברתיות
                      </Typography>
                    </Grid> */}

                    {/* <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="פייסבוק"
                        name="socialMedia.facebook"
                        value={formData.socialMedia.facebook}
                        onChange={handleChange}
                        disabled={!editing}
                        variant={editing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !editing,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="אינסטגרם"
                        name="socialMedia.instagram"
                        value={formData.socialMedia.instagram}
                        onChange={handleChange}
                        disabled={!editing}
                        variant={editing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !editing,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="לינקדאין"
                        name="socialMedia.linkedin"
                        value={formData.socialMedia.linkedin}
                        onChange={handleChange}
                        disabled={!editing}
                        variant={editing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !editing,
                        }}
                      />
                    </Grid> */}
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </dialog>
  );
};
