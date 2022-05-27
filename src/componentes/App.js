import styled from "styled-components"
import  { useState } from  "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './Cadastro'
import LoginPage from "./LoginPage";
import TelaHoje from "./TelaHoje";
import Habitos from "./Habitos";
import InfoLoginContext from "../contexts/InfoLogin";

export default function App(){
    
    const [infoLogin, setInfoLogin] = useState({});
    
    return(
        <InfoLoginContext.Provider value = {{infoLogin , setInfoLogin}}>
            <BrowserRouter>
                    <div className="root">
                        <Container>
                            <Routes>
                                <Route path="/" element={<LoginPage />}/>
                                <Route path="/cadastro" element={<Cadastro />}/>
                                <Route path="/hoje" element={<TelaHoje />}/>
                                <Route path="/habitos" element={<Habitos />}/>
                            </Routes>
                        </Container>
                    </div>
            </BrowserRouter>
        </InfoLoginContext.Provider>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;

    `
