import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Home from './pages/home/Home';
import { Box, Container } from '@mui/system';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import Calculator from './pages/calculator/Calculator';
import ScrollToTop from './utils/components/ScrollToTop';
import HomeIcon from '@mui/icons-material/Home';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    return (
        <>
            <BrowserRouter>
                <DndProvider backend={HTML5Backend} >
                    <AppBar position="static">
                        <Toolbar>
                            <Container>
                                <Link to="/" >
                                    <IconButton>
                                        <HomeIcon fontSize='large' />
                                    </IconButton>
                                </Link>

                            </Container>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}>
                        <Container maxWidth="lg">
                            <ScrollToTop />
                            <Routes>
                                <Route key={0} path="/" element={<Home />} />
                                <Route key={1} path=":itemClass" element={<Calculator />} />
                            </Routes>
                        </Container>
                    </Box>
                </DndProvider>
            </BrowserRouter>

        </>


    );
}

export default App;
