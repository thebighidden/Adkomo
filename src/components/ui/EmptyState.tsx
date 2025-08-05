import { Box, Typography, Button } from '@mui/material'
// import { PersonAdd } from '@mui/icons-material'

interface EmptyStateProps {
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
  showAction?: boolean
}

export default function EmptyState({ 
  title = "Aucun utilisateur trouvé",
  message = "Commencez par ajouter votre premier utilisateur.",
  actionLabel = "Ajouter un utilisateur",
  onAction,
  showAction = true
}: EmptyStateProps) {
  return (
    <Box 
      textAlign="center" 
      mt={6}
      p={4}
      sx={{
        background: '#f8f9fa',
        borderRadius: 2,
        border: '1px solid #e9ecef'
      }}
    >
      <Box sx={{ mb: 2 }}>
        {/* <PersonAdd sx={{ fontSize: 48, color: '#bdc3c7' }} /> */}
      </Box>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ 
          fontWeight: 600,
          color: '#2c3e50',
          mb: 1
        }}
      >
        {title}
      </Typography>
      <Typography 
        color="text.secondary" 
        variant="body1"
        sx={{ mb: showAction && onAction ? 3 : 0 }}
      >
        {message}
      </Typography>
      {showAction && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          // startIcon={<PersonAdd />}
          sx={{
            background: '#3498db',
            '&:hover': {
              background: '#2980b9',
            },
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  )
} 