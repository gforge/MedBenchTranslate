import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Route, Routes } from 'react-router-dom';

import { Overview } from './Overview';
import { Translator } from './Translator';

function App() {
    return (
        <>
            <h1>MedBench translator</h1>
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route
                    path="/translator/:chartId/:language"
                    element={<Translator />}
                />
                {/* Add more routes as needed */}
            </Routes>
        </>
    );
}

export default App;
