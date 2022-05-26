import styled from "styled-components"
import Rectangle14 from "../assets/img/Rectangle14.png"
import {useState} from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import Topo from "./Topo"
import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';

export default function Menu(){
    const navigate = useNavigate();
    
    function irParaHabitos(){
        navigate("/habitos")
    }
    const percentage = 66;
    return (
        <Footer>
            <p onClick={irParaHabitos}>Hábitos</p>
            <Link to="/hoje">
                <div><CircularProgressbar 
                            value={percentage} 
                            minValue={0} maxValue={100} 
                            text={"Hoje"}
                            strokeWidth={5}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                            textSize:"17.9px",
                            strokeLinecap: "butt",
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                            })}
                        />
                </div>
            </Link>
            <Link to="/historico">
                <p>Histórico</p>
            </Link>
        </Footer>
    )
}

const Footer = styled.div`
    position:fixed;
    top:0;
    left:0;
    display:flex;
    justify-content:space-around;
    align-items:center;
    padding-left:36px;
    padding-right:31px;
    width: 375px;
    height: 70px;
    margin-top:500px;
    background: #FFFFFF;
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
    }
    div{
        width: 91px;
        height: 91px;
    }

`