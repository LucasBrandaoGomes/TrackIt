import styled from "styled-components"
import logoEntrada from "../assets/img/Group8.jpg"
import {useState} from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {useNavigate} from 'react-router-dom';

export default function LoginPage(){
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [token, setToken] = useState("");

    function SubmitLogin(event){
        event.preventDefault();
        const infoLogin =
            {
                email,
                password: senha
            }
        
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", infoLogin)
        
        promise
        .then(res =>{ 
            console.log(res.data);
            setToken(res.data.token);
            navigate("/hoje");
        })
        .catch(err=> alert("Erro"))
    }


    return(
        <>
            <Logo>
                <img src={logoEntrada} alt="Logo entrada"/>
            </Logo>
            <Form onSubmit={SubmitLogin}>
                <input type="email" placeholder="email"  value={email} onChange={e => setEmail(e.target.value)} required/>
                <input type="number" placeholder="senha" value={senha} onChange={e => setSenha(e.target.value)} required/>
                <Entrar type="submit">Entrar</Entrar>
            </Form >
            <Cadastrese>
                <Link to="/cadastro">
                    <p>Não tem uma conta?Cadastre-se</p>
                </Link>
            </Cadastrese>
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
const Entrar = styled.button`
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
const Cadastrese = styled.div`
    margin-top:65px;
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