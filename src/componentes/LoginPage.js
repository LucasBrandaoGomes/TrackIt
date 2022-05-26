import styled from "styled-components"
import logoEntrada from "../assets/img/Group8.jpg"
import {useState} from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import { useContext } from "react";
import TokenContext from "../contexts/TokenContext"
import InfoLoginContext from "../contexts/InfoLogin"

export default function LoginPage(){

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [opaco,setOpaco] = useState("false")
    
    const { setToken } = useContext(TokenContext);
    {/*const {infoLogin, setInfoLogin } = useContext(InfoLoginContext);*/}

    function SubmitLogin(event){
        event.preventDefault();
        
        setOpaco("true");

        const envioLogin =
            {
                email,
                password: senha
            }
        
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", envioLogin)
        
        promise
        .then(res =>{ 
            setToken(res.data.token);
            {/*setInfoLogin({
                id: res.data.id,
                name: res.data.name,
                image: res.data.image,
                email: res.data.email,
                password: res.data.password,
                token: res.data.token
            })*/}
            navigate("/hoje");

        })
        .catch(err=> {
            alert("Erro");
            setOpaco("false")})
    }


    return(
        <>
            <Logo>
                <img src={logoEntrada} alt="Logo entrada"/>
            </Logo>
            <Form onSubmit={SubmitLogin}>
                <input type="email" placeholder="email"  value={email} opaco={opaco} onChange={e => setEmail(e.target.value)} required/>
                <input type="number" placeholder="senha" value={senha} opaco={opaco} onChange={e => setSenha(e.target.value)} required/>
                <Entrar type="submit" opaco={opaco}>Entrar</Entrar>
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
    background:#FFFFFF;
    

    input{
        background: ${props => props.opaco ? "#f2f2f2" : "#ffffff"};
        opacity: 1;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        margin-bottom:8px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    
        color: #DBDBDB;
    }
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
    opacity: ${props => props.opaco ? 1 : 0.4 };
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