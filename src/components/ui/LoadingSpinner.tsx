import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingSpinnerProps {
  size?: number
  message?: string
  color?: string
}

export default function LoadingSpinner({ 
  size = 50, 
  message = "Chargement...", 
  color = '#2c3e50' 
}: LoadingSpinnerProps) {
  return (
    <Box 
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center"
      mt={6}
      gap={2}
    >
      <CircularProgress 
        size={size}
        sx={{ color }}
      />
      {message && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  )
} 