import styled from "styled-components"
import Topo from "./Topo"
import Menu from "./Menu"
import dayjs from "dayjs"
import 'dayjs/locale/pt-br'
import { useContext } from "react";
import InfoLoginContext from "../contexts/InfoLogin";
import { useState } from "react"
import axios from "axios"
import {useEffect} from 'react';

export default function TelaHoje(){

    const dataHoje = dayjs().locale('pt-br')
    const { infoLogin } = useContext(InfoLoginContext); 
    const [meusHabitosHoje, setMeusHabitosHoje] = useState([])

    const config = 
    {
        headers:{Authorization: `Bearer ${infoLogin.token}`}
    }
    
    useEffect(() => {

    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
    
    promise
    .then(res=> {
        setMeusHabitosHoje([...res.data]);
        console.log("meus habitos hoje", meusHabitosHoje)
        })
    .catch(err =>  alert("Erro ao carregar habitos de hoje"));

    }, []);

    function HabitoHoje({nomeHabito, sequenciaAtual, maiorSequencia}){
       return(
        <>
            <p>{nomeHabito}</p>
            <p>Sequencia atual: {sequenciaAtual}</p>
            <p>Seu recorde: {maiorSequencia}</p>
        </>
       )
    }

    return (
        <>  
            <Topo urlImage={infoLogin.image} />
            <ConteudoHoje>
                <div>
                    <h1>{dataHoje.format("dddd")}, {dataHoje.format("DD/MM")}</h1>
                </div>
                    {meusHabitosHoje.length === 0 ?
                    <></> :
                    meusHabitosHoje.map(item => <HabitoHoje nomeHabito={item.name} sequenciaAtual={item.currentSequence} maiorSequencia={item.highestSequence}/>)}
            </ConteudoHoje>
            <Menu />
        </>
    )
}
const ConteudoHoje = styled.div`
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
