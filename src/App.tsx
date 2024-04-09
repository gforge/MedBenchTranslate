import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Route, Routes } from 'react-router-dom';

import { Overview } from './Overview';
import { Translator } from './Translator';

function App() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >
            <h1>MedBench translator</h1>
            <div>
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route
                        path="/translator/:chartId/:language"
                        element={<Translator />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
