"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import UploadView from './components/UploadView';
import AnalyzingView from './components/AnalyzingView';
import ResultsView from './components/ResultsView';

const initialLoadingSteps = [
    { id: 1, label: 'Parsing your resume', status: 'pending' },
    { id: 2, label: 'Analyzing your experience', status: 'pending' },
    { id: 3, label: 'Extracting your skills', status: 'pending' },
    { id: 4, label: 'Generating recommendations', status: 'pending' },
];

export default function ATSCheckerPage() {
    const [appState, setAppState] = useState('idle'); // 'idle', 'analyzing', 'results'
    const [loadingSteps, setLoadingSteps] = useState(initialLoadingSteps);
    const [resultsData, setResultsData] = useState(null);
    const [error, setError] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    // Simulate the analysis process steps visually
    useEffect(() => {
        if (appState === 'analyzing') {
            let currentStep = 0;
            
            const advanceStep = () => {
                setLoadingSteps(prev => prev.map((step, index) => {
                    if (index < currentStep) return { ...step, status: 'completed' };
                    if (index === currentStep) return { ...step, status: 'active' };
                    return step;
                }));

                currentStep++;

                if (currentStep <= initialLoadingSteps.length) {
                    setTimeout(advanceStep, 2500); 
                }
            };

            advanceStep();
        } else if (appState === 'idle') {
            // Reset loading steps if we go back
            setLoadingSteps(initialLoadingSteps);
            setUploadedFile(null);
            setResultsData(null);
        }
    }, [appState]);

    const handleUpload = async (file) => {
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setError("File is too large. Max 2MB.");
            return;
        }

        setError('');
        setAppState('analyzing');
        setUploadedFile(file);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const { data } = await axios.post('/api/ats', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setResultsData(data);
            setAppState('results');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "An error occurred");
            setAppState('idle');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] relative overflow-x-hidden flex flex-col">
            <Navbar onNewUpload={appState !== 'idle' ? () => setAppState('idle') : null} />
            <div className="flex-1 pt-6 pb-24 px-4 sm:px-6 relative">
                {/* Ambient Background Gradients */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-200/40 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-200/40 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {appState === 'idle' && (
                        <UploadView onUpload={handleUpload} error={error} />
                    )}
                    
                    {appState === 'analyzing' && (
                        <AnalyzingView loadingSteps={loadingSteps} />
                    )}
                    
                    {appState === 'results' && (
                        <ResultsView resultsData={resultsData} file={uploadedFile} />
                    )}
                </div>
            </div>
        </div>
    );
}
