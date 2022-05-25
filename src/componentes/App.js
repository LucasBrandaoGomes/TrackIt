import styled from "styled-components"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './Cadastro'
import LoginPage from "./LoginPage";

export default function App(){

    return(
        <BrowserRouter>
            
                <div className="root">
                    <Container>
                        <Routes>
                            <Route path="/" element={<LoginPage />}/>
                            <Route path="/cadastro" element={<Cadastro />}/>
                        </Routes>
                    </Container>
                </div>
            
        </BrowserRouter>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;

    `
