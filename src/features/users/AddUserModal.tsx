'use client'

import { useState } from 'react'
import { z } from 'zod'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material'

// Enhanced validation schema
const userSchema = z.object({
  first_name: z.string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes'),
  last_name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes'),
  email: z.string()
    .email('Format d\'email invalide')
    .min(5, 'L\'email doit contenir au moins 5 caractères')
    .max(100, 'L\'email ne peut pas dépasser 100 caractères')
    .toLowerCase(),
})

type UserFormData = z.infer<typeof userSchema>

interface AddUserModalProps {
  open: boolean
  onClose: () => void
  onAddUser: (user: UserFormData) => void
}

export default function AddUserModal({ open, onClose, onAddUser }: AddUserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    first_name: '',
    last_name: '',
    email: '',
  })
  const [errors, setErrors] = useState<Partial<UserFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (field: keyof UserFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const validateField = (field: keyof UserFormData, value: string) => {
    try {
      userSchema.shape[field].parse(value)
      return undefined
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0].message
      }
      return 'Erreur de validation'
    }
  }

  const handleBlur = (field: keyof UserFormData) => () => {
    const value = formData[field]
    const error = validateField(field, value)
    setErrors(prev => ({
      ...prev,
      [field]: error
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const validatedData = userSchema.parse(formData)
      onAddUser(validatedData)
      setShowSuccess(true)
      handleClose()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<UserFormData> = {}
        error.issues.forEach((err: z.ZodIssue) => {
          const field = err.path[0] as keyof UserFormData
          fieldErrors[field] = err.message
        })
        setErrors(fieldErrors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
    })
    setErrors({})
    setIsSubmitting(false)
    onClose()
  }

  const isFormValid = formData.first_name && formData.last_name && formData.email && 
    !errors.first_name && !errors.last_name && !errors.email

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            background: '#ffffff',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: '#2c3e50',
          color: 'white',
          fontWeight: 600,
          textAlign: 'center',
          py: 2.5,
        }}>
          Nouvel Utilisateur
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Remplissez les informations pour créer un nouvel utilisateur
            </Typography>
            
            <Box display="flex" flexDirection="column" gap={2.5}>
              <TextField
                label="Prénom"
                value={formData.first_name}
                onChange={handleInputChange('first_name')}
                onBlur={handleBlur('first_name')}
                error={!!errors.first_name}
                helperText={errors.first_name || 'Ex: Jean'}
                fullWidth
                required
                variant="outlined"
                disabled={isSubmitting}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              />
              
              <TextField
                label="Nom"
                value={formData.last_name}
                onChange={handleInputChange('last_name')}
                onBlur={handleBlur('last_name')}
                error={!!errors.last_name}
                helperText={errors.last_name || 'Ex: Dupont'}
                fullWidth
                required
                variant="outlined"
                disabled={isSubmitting}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              />
              
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                onBlur={handleBlur('email')}
                error={!!errors.email}
                helperText={errors.email || 'Ex: jean.dupont@example.com'}
                fullWidth
                required
                variant="outlined"
                disabled={isSubmitting}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button 
              onClick={handleClose} 
              disabled={isSubmitting}
              sx={{
                color: '#7f8c8d',
                '&:hover': {
                  background: '#f8f9fa',
                },
              }}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isSubmitting || !isFormValid}
              sx={{
                background: '#3498db',
                borderRadius: 1,
                px: 3,
                py: 1,
                fontWeight: 600,
                '&:hover': {
                  background: '#2980b9',
                },
                '&:disabled': {
                  background: '#bdc3c7',
                },
              }}
            >
              {isSubmitting ? 'Ajout...' : 'Ajouter'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Utilisateur ajouté avec succès !
        </Alert>
      </Snackbar>
    </>
  )
} 