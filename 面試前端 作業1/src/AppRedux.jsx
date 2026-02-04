import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { increment, clear, toggleDisable } from './store';
import { 
  Button, 
  ButtonGroup, 
  Box, 
  Typography, 
  Paper,
  ThemeProvider,
  createTheme
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4a76c0",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function AppRedux() {
  // Requirement: (Bonus) Using Redux for state management
  const count = useSelector((state) => state.counter.value);
  const isDisabled = useSelector((state) => state.counter.disabled);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f0f2f5",
          p: 3,
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1a237e' }}>
          Redux 版本 (加分項)
        </Typography>

        <Paper elevation={4} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <ButtonGroup
            orientation="vertical"
            sx={{
              '& .MuiButton-root': {
                width: 300,
                height: 100,
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#4a76c0',
                borderColor: '#b2c8eb',
                '&:hover': {
                  bgcolor: '#e3f2fd',
                },
              }
            }}
          >
            <Button 
              onClick={() => dispatch(increment())} 
              disabled={isDisabled}
            >
              {`CLICK:${count}`}
            </Button>
            <Button onClick={() => dispatch(clear())}>
              CLEAR
            </Button>
            <Button onClick={() => dispatch(toggleDisable())}>
              {isDisabled ? "ABLE" : "DISABLE"}
            </Button>
          </ButtonGroup>
        </Paper>
        
        <Typography variant="body1" sx={{ mt: 4, color: '#666' }}>
          此版本完全由 <strong>Redux Toolkit</strong> 驅動。
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
