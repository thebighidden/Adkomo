'use client'

import { useState } from 'react'
import UsersList from '@/features/users/UsersList'
import AddUserModal from '@/features/users/AddUserModal'
import { Container, Typography, Button, Box, Paper, Chip, Alert } from '@mui/material'

export default function HomePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  const handleAddUser = (userData: { first_name: string; last_name: string; email: string }) => {
    console.log('Nouvel utilisateur ajouté:', userData)
    // Ici on pourrait ajouter l'utilisateur à la liste locale ou faire un appel API
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Welcome Alert */}
        {showWelcome && (
          <Alert 
            severity="info" 
            onClose={() => setShowWelcome(false)}
            sx={{ mb: 3 }}
          >
            <Typography variant="body2">
              <strong>Bienvenue !</strong> Gérez vos utilisateurs en toute simplicité. 
              Cliquez sur &quot;Ajouter un utilisateur&quot; pour commencer.
            </Typography>
          </Alert>
        )}

        <Paper elevation={2} sx={{ 
          p: 3, 
          borderRadius: 2,
          background: '#ffffff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}>
          {/* Header Section */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: '#2c3e50',
                  mb: 1,
                  background: 'linear-gradient(45deg, #2c3e50, #3498db)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Gestion des Utilisateurs
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Gérez votre équipe en toute simplicité avec notre interface intuitive
              </Typography>
             
            </Box>
            <Button
              variant="contained"
              size="large"
              onClick={() => setIsAddModalOpen(true)}
              sx={{
                background: 'linear-gradient(45deg, #3498db, #2980b9)',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #2980b9, #1f5f8b)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 20px rgba(52, 152, 219, 0.4)',
                },
                transition: 'all 0.2s ease'
              }}
            >
              Ajouter un utilisateur
            </Button>
          </Box>
          
          {/* Main Content */}
          <UsersList />
        </Paper>
        
        {/* Add User Modal */}
        <AddUserModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddUser={handleAddUser}
        />
      </Container>
    </Box>
  )
}
