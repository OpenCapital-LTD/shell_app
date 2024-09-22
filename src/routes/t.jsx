import React from 'react'
import { Routes, Route } from 'react-router-dom';
// import Login from '../pages/authentication/login';

const Test = () => {
    return (
        <div>Oya oya  </div>
    )
}
const TestRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<Test/>} />
            {/* <Route path='login' element={<Login />} /> */}
        </Routes>
    )
}
export default TestRoute