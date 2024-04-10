import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import { Overview } from './Overview';
import { Translator } from './Translator';

function App() {
    return (
        <>
            <header>MedBench translator</header>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route
                        path="/translator/:chartId/:language"
                        element={<Translator />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
