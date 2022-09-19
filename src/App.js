import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Home from './pages/home/Home';
import { Box, Container } from '@mui/system';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Calculator from './pages/calculator/Calculator';
import ScrollToTop from './utils/components/ScrollToTop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import logoToolbar from './res/logoToolbar.png'

function App() {
    return (
        <>
            <BrowserRouter>
                <DndProvider backend={HTML5Backend} >
                    <AppBar position="static">
                        <Container>
                            <Toolbar>
                                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }} >
                                    <div style={{ display: "flex" }} >
                                        <img style={{ height: '2em', marginRight: '1em' }} src={logoToolbar} alt='Aeternum Craft' />
                                    </div>
                                </Link>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    <Box sx={{
                        bgcolor: 'background.paper',
                        pt: 2,
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
