import styled from "styled-components"
import logoEntrada from "../assets/img/Group8.jpg"
import { Link } from "react-router-dom"
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import  { useState } from  "react"

export default function Cadastro(){
    
    const navigate = useNavigate();
    const [emailCadastro, setEmailCadastro] = useState("")
    const [senhaCadastro, setSenhaCadastro] = useState("")
    const [nomeCadastro, setNomeCadastro] = useState("")
    const [fotoCadastro, setFotoCadastro] = useState("")

    function SubmitCadastro(event){
        event.preventDefault();
        const infoCadastro =
            {
                email: emailCadastro,
                name: nomeCadastro,
                image: fotoCadastro,
                password: senhaCadastro
            }
        
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", infoCadastro)
        
        promise
        .then(res =>{ 
            console.log(res.data);
            
            navigate("/");
        })
        .catch(err=> alert("Erro, preencha corretamente os dados"))
    }

    return(
        <>
            <Logo>
                <img src={logoEntrada} alt="Logo entrada"/>
            </Logo>
            <Form onSubmit={SubmitCadastro} >
                <input type="email" placeholder="email"  value={emailCadastro} onChange={e => setEmailCadastro(e.target.value)} required/>
                <input type="number" placeholder="senha" value={senhaCadastro} onChange={e => setSenhaCadastro(e.target.value)} required/>
                <input type="text" placeholder="nome" value={nomeCadastro} onChange={e => setNomeCadastro(e.target.value)} required/>
                <input type="url" placeholder="foto" value={fotoCadastro} onChange={e => setFotoCadastro(e.target.value)} required/>
                <Cadastrar type="submit">Cadastrar</Cadastrar>
            </Form >
            <Loguese>
                <Link to="/">
                    <p>Já tem uma conta?Faça login</p>
                </Link>
            </Loguese>
        </>
   )
}

const Logo = styled.div`
    margin-top: 68px;
    margin-bottom:33px;
`
const Form = styled.form`
    display:flex;
    flex-direction: column;
    width: 303px;
    height: 45px;
    background: #FFFFFF;

    input{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        margin-bottom:8px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    
        color: #DBDBDB;}
`
const Cadastrar = styled.button`
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border: none;
    border-radius: 4.63636px;
    text-decoration: none; 

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;

    color: #FFFFFF;
    &:hover{
        cursor:pointer;
    }
`
const Loguese = styled.div`
    margin-top:140px;
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-decoration-line: underline;

        color: #52B6FF;
    }
    `