import styled from "styled-components"
import logoEntrada from "../assets/img/Group8.jpg"
import {useState} from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner";
import {useNavigate} from 'react-router-dom';
import { useContext } from "react";
import InfoLoginContext from "../contexts/InfoLogin"

export default function LoginPage(){

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [disableButton,setDisableButton] = useState(false)
    
    const { setInfoLogin } = useContext(InfoLoginContext);

    function SubmitLogin(event){
        event.preventDefault();
        
        setDisableButton(true);

        const envioLogin =
            {
                email,
                password: senha
            }
        
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", envioLogin)
        
        promise            
        .then(res => {
            setInfoLogin({...res.data});
            navigate("/hoje");

        })
        .catch(err=> {
            alert("Erro");
            setDisableButton(false)})
    }

    return(
        <>  
            <Logo>
                <img src={logoEntrada} alt="Logo entrada"/>
            </Logo>
            <Form onSubmit={SubmitLogin}>
                <input type="email" disabled={disableButton} placeholder="email"  value={email} onChange={e => setEmail(e.target.value)} required/>
                <input type="password" disabled={disableButton} placeholder="senha" value={senha} onChange={e => setSenha(e.target.value)} required/>
                <Entrar type="submit" disabled={disableButton}>{disableButton ? <ThreeDots color="white"/> : "Entrar"}</Entrar>
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
        background: ${props => props.disabled ? "grey" : "#ffffff"};
        color: ${props => props.disabled ? "#AFAFAF" : "grey"};
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        margin-bottom:8px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        ::placeholder{
            font-size: 18px;
            color: #DBDBDB;
        }
    }
`
const Entrar = styled.button`
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border: none;
    border-radius: 4.63636px;
    text-decoration: none; 
    display:flex;
    align-items:center;
    justify-content:center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;

    color: #FFFFFF;
    opacity: ${props => props.disabled ? 0.4 : 1 };
    &:hover{
        cursor:pointer;
    }
`
const Cadastrese = styled.div`
    margin-top:75px;
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