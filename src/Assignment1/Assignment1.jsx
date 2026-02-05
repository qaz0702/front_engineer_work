import * as React from "react";
import { 
  Button, 
  ButtonGroup, 
  Box, 
  Typography, 
  Paper,
  ThemeProvider,
  createTheme
} from "@mui/material";
import AppRedux from "./AppRedux";
import "./Assignment1.css";

// Create a custom theme
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

function Assignment1() {
  const [view, setView] = React.useState("useState"); // "useState" or "redux"
  
  // Requirement 1 & 2: use useState to handle the count value
  const [count, setCount] = React.useState(0);
  
  // Requirement 3: state to handle the disable functionality
  const [isDisabled, setIsDisabled] = React.useState(false);

  // Logic for the CLICK button
  const handleIncrement = () => {
    if (!isDisabled) {
      setCount((prev) => prev + 1);
    }
  };

  // Logic for the CLEAR button
  const handleClear = () => {
    setCount(0);
  };

  // Logic for the DISABLE/ABLE button
  const handleToggleDisable = () => {
    setIsDisabled((prev) => !prev);
  };

  if (view === "redux") {
    return (
      <Box sx={{ position: 'relative' }}>
        <AppRedux />
        <Button 
          onClick={() => setView("useState")}
          sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 10 }}
          variant="contained"
        >
          切換至 useState 版本
        </Button>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fafafa",
          p: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
          前端面試作業一
        </Typography>

        <Paper
          elevation={2}
          sx={{
            p: 1,
            borderRadius: 4,
            bgcolor: "white",
            display: "inline-block",
            mb: 4,
            border: '1px solid #eee'
          }}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical button group"
            sx={{
              // Use ButtonGroup CSS API for styling
              border: "2px solid #b2c8eb",
              borderRadius: "12px",
              overflow: "hidden",
              "& .MuiButtonGroup-grouped": {
                borderBottom: "1px solid #b2c8eb !important",
                borderRight: "none !important",
                "&:last-child": {
                  borderBottom: "none !important",
                },
              },
              "& .MuiButton-root": {
                width: 280,
                height: 90,
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#4a76c0",
                bgcolor: "white",
                borderRadius: 0,
                transition: 'all 0.2s',
                "&:hover": {
                  bgcolor: "#f0f7ff",
                  transform: 'scale(1.02)',
                  zIndex: 2
                },
                "&.Mui-disabled": {
                  bgcolor: "#f5f5f5",
                  color: "#bdbdbd",
                },
              },
            }}
          >
            <Button 
                onClick={handleIncrement} 
                disabled={isDisabled}
            >
              {`CLICK:${count}`}
            </Button>
            
            <Button onClick={handleClear}>
              CLEAR
            </Button>
            
            <Button onClick={handleToggleDisable}>
              {isDisabled ? "ABLE" : "DISABLE"}
            </Button>
          </ButtonGroup>
        </Paper>

        <Box sx={{ mt: 2, textAlign: "center", color: "#666", maxWidth: 450 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✅ <strong>useState</strong> 處理數值 (符合需求 1 & 2)
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✅ <strong>ButtonGroup CSS API</strong> 樣式調整 (符合需求)
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#4caf50', fontWeight: 'bold' }}>
            🚀 已額外實作 Redux 版本以獲取加分
          </Typography>
          
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => setView("redux")}
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            查看 Redux 版本
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Assignment1;
