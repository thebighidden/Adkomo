"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import { User } from "@/services/users";

interface UserDetailModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

export default function UserDetailModal({
  user,
  open,
  onClose,
}: UserDetailModalProps) {
  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: "#ffffff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "#2c3e50",
          color: "white",
          fontWeight: 600,
          textAlign: "center",
          py: 2.5,
        }}
      >
        Profil Utilisateur
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Box sx={{ position: "relative", mb: 2 }}>
            <Avatar
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              sx={{
                width: 120,
                height: 120,
                border: "4px solid #ecf0f1",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: "#2c3e50",
            }}
          >
            {user.first_name} {user.last_name}
          </Typography>
          <Chip
            label={`ID: ${user.id}`}
            variant="outlined"
            sx={{
              borderColor: "#bdc3c7",
              color: "#34495e",
              fontWeight: 500,
            }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
            sx={{ fontWeight: 600, mb: 2 }}
          >
            Informations personnelles
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                p: 2,
                background: "#f8f9fa",
                borderRadius: 1,
                border: "1px solid #e9ecef",
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Prénom
              </Typography>
              <Typography variant="body1" fontWeight={600} color="#2c3e50">
                {user.first_name}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                background: "#f8f9fa",
                borderRadius: 1,
                border: "1px solid #e9ecef",
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Nom
              </Typography>
              <Typography variant="body1" fontWeight={600} color="#2c3e50">
                {user.last_name}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                background: "#f8f9fa",
                borderRadius: 1,
                border: "1px solid #e9ecef",
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="body1" fontWeight={600} color="#2c3e50">
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            background: "#3498db",
            borderRadius: 1,
            px: 3,
            py: 1,
            fontWeight: 600,
            "&:hover": {
              background: "#2980b9",
            },
          }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
