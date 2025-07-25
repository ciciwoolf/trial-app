import { Layout } from './components/Layout'
import { Typography, Card, CardContent, Box, Button } from '@mui/material'

function App() {
  return (
    <Layout>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          NASA Data Explorer
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Real-time space data and mission analytics
        </Typography>
      </Box>
      
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" gutterBottom color="primary">
            System Status: Online
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Dashboard initializing...
          </Typography>
          <Button variant="contained" size="large">
            Start Exploring
          </Button>
        </CardContent>
      </Card>
    </Layout>
  )
}

export default App