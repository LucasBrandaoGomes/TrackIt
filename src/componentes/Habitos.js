import styled from "styled-components"
import {useState} from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import Topo from "./Topo"
import Rectangle14 from "../assets/img/Rectangle14.png"
import Menu from "./Menu";
import { useContext } from "react";
import TokenContext from "../contexts/TokenContext"
import InfoLoginContext from "../contexts/InfoLogin";

export default function Habitos(){
    
    const [meusHabitos, setMeusHabitos] =useState([]);
    const { token } = useContext(TokenContext);
    //const { infoLogin } = useContext(InfoLoginContext);
    
    const config = 
    {
        headers:{Authorization: `Bearer ${token}`}
    }
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
    
    //usar useEffect
    promise.then(res=> {
        console.log(res.data)
        setMeusHabitos(...res.data);
        })

    return (
        <>  
            <Topo urlPerfil={Rectangle14} />
            {meusHabitos === "undefined" ?
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            :
                <p>AQUI SEUS HÁBITOS</p>
            }
            <Menu />
        </>
    )
}

const Container = styled.div`
    background-color: #F2F2F2;
    width:100%;
    padding-top: 98px;
    p{
        padding-left:17px;
        padding-right:18px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;

        color: #BABABA;
    }
    div{
        display:flex;
        width: 100%;
        justify-content:space-between;
        align-items:center;
        padding-left:17px;
        padding-right:18px;
    }
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;

        color: #126BA5;
    }
    `