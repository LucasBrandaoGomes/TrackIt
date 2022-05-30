import Topo from "./Topo"
import Menu from "./Menu"
import styled from "styled-components"
import { useContext } from "react";
import InfoLoginContext from "../contexts/InfoLogin"

export default function TelaHistorico(){

    const { infoLogin } = useContext(InfoLoginContext);

    return(
        <>
            <Topo urlImage={infoLogin.image} />
            <ContainerHistorico>
                <h1>Histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </ContainerHistorico>
            <Menu />
        </>

    )
}
const ContainerHistorico = styled.div`
    background-color: #F2F2F2;
    width:100%;
    height: 100vh;
    padding-top: 98px;
    padding-left: 18px;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;

        color: #126BA5;
        margin-bottom:17px;
    }
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;

        color: #666666;
    }

    `