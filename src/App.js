import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import { Box, Container } from '@mui/system';
import { AppBar, Toolbar } from '@mui/material';

function App() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>

                </Toolbar>
            </AppBar>
            <Box sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}>
                <Container maxWidth="lg">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />}>
                                <Route index element={<Home />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Container>

            </Box>
        </>


    );
}

export default App;
