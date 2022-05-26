import styled from "styled-components"
import Rectangle14 from "../assets/img/Rectangle14.png"
import {useState} from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import Topo from "./Topo"
import Menu from "./Menu"
import dayjs from "dayjs"
import 'dayjs/locale/pt-br'

export default function TelaHoje(){
    const dataHoje = dayjs().locale('pt-br')
    return (
        <>  
            <Topo urlPerfil={Rectangle14} />
            <ConteudoHoje>
                <div>
                    <h1>{dataHoje.format("dddd")}, {dataHoje.format("DD/MM")}</h1>
                </div>
                <p>Nenhum hábito concluído ainda</p>
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
