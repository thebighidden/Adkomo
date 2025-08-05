'use client'

import { useState } from 'react'
import { useUsers } from '@/hooks/useUsers'
import { Box } from '@mui/material'
import { User } from '@/services/users'
import UserDetailModal from './UserDetailModal'
import UserCard from '@/components/ui/UserCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import EmptyState from '@/components/ui/EmptyState'

export default function UsersList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { data: users, isLoading, isError, error, refetch } = useUsers()

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
  }

  const handleCloseModal = () => {
    setSelectedUser(null)
  }

  const handleAddUser = () => {
    // This would typically open the add user modal
    console.log('Add user action')
  }

  // Loading state
  if (isLoading) {
    return <LoadingSpinner message="Chargement des utilisateurs..." />
  }

  // Error state
  if (isError) {
    return (
      <ErrorMessage
        title="Erreur de chargement"
        message="Impossible de récupérer les utilisateurs pour le moment."
        onRetry={refetch}
      />
    )
  }

  // Empty state
  if (!users || users.length === 0) {
    return (
      <EmptyState
        title="Aucun utilisateur trouvé"
        message="Commencez par ajouter votre premier utilisateur."
        actionLabel="Ajouter un utilisateur"
        onAction={handleAddUser}
      />
    )
  }

  return (
    <Box>
      {/* Header with stats */}
      <Box sx={{ mb: 3, p: 2, background: '#f8f9fa', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Box component="span" sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#2c3e50' }}>
              {users.length}
            </Box>
            <Box component="span" sx={{ ml: 1, color: '#6c757d' }}>
              utilisateur{users.length > 1 ? 's' : ''}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Users grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 2.5,
      }}>
        {users.map((user) => (
          <UserCard 
            key={user.id}
            user={user} 
            onClick={handleUserClick}
          />
        ))}
      </Box>

      {/* User detail modal */}
      <UserDetailModal 
        user={selectedUser} 
        open={!!selectedUser} 
        onClose={handleCloseModal} 
      />
    </Box>
  )
}
