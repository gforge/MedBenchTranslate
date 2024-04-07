import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './App.css'

import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1>MedBench translator</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1e6)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
