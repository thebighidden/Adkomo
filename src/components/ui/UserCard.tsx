import { Card, CardContent, Typography, Avatar, Box, Chip, Skeleton } from '@mui/material'
import { User } from '@/services/users'

interface UserCardProps {
  user: User
  onClick?: (user: User) => void
  loading?: boolean
}

export default function UserCard({ user, onClick, loading = false }: UserCardProps) {
  const handleClick = () => {
    if (onClick && !loading) {
      onClick(user)
    }
  }

  return (
    <Card 
      elevation={2}
      sx={{ 
        cursor: loading ? 'default' : 'pointer',
        background: '#ffffff',
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: loading ? 'none' : 'translateY(-2px)',
          boxShadow: loading ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.15)',
          borderColor: loading ? '#e0e0e0' : '#3498db',
        },
        opacity: loading ? 0.7 : 1,
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ 
        textAlign: 'center', 
        p: 2.5,
      }}>
        <Box sx={{ mb: 2 }}>
          {loading ? (
            <Skeleton 
              variant="circular" 
              width={80} 
              height={80} 
              sx={{ mx: 'auto' }}
            />
          ) : (
            <Avatar
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto',
                border: '3px solid #ecf0f1',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
          )}
        </Box>
        
        {loading ? (
          <>
            <Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto', mb: 1 }} />
            <Skeleton variant="text" width="60%" height={16} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="rectangular" width={60} height={24} sx={{ mx: 'auto', borderRadius: 1 }} />
          </>
        ) : (
          <>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                mb: 1,
                color: '#2c3e50',
              }}
            >
              {user.first_name} {user.last_name}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontSize: '0.875rem',
                mb: 2,
                color: '#7f8c8d',
              }}
            >
              {user.email}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 1,
            }}>
              <Chip
                label={`ID: ${user.id}`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: '#bdc3c7',
                  color: '#34495e',
                  fontSize: '0.75rem',
                }}
              />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
} 