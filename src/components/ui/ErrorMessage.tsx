import { Box, Typography, Button } from '@mui/material'
// import { Refresh } from '@mui/icons-material'

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
  showRetry?: boolean
}

export default function ErrorMessage({ 
  title = "Une erreur s'est produite",
  message = "Impossible de charger les données pour le moment.",
  onRetry,
  showRetry = true
}: ErrorMessageProps) {
  return (
    <Box 
      textAlign="center" 
      mt={6}
      p={3}
      sx={{
        background: '#fff3f3',
        borderRadius: 2,
        border: '1px solid #ffcdd2'
      }}
    >
      <Typography 
        color="error" 
        variant="h6" 
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        {title}
      </Typography>
      <Typography 
        color="text.secondary" 
        variant="body1"
        sx={{ mb: showRetry && onRetry ? 2 : 0 }}
      >
        {message}
      </Typography>
      {showRetry && onRetry && (
        <Button
          variant="outlined"
          color="error"
          onClick={onRetry}
          // startIcon={<Refresh />}
          sx={{ mt: 1 }}
        >
          Réessayer
        </Button>
      )}
    </Box>
  )
} 