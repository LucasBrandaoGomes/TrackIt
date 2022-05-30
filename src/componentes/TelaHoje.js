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
    const [reload, setReload] = useState(false);
    const [porcentagem, setPorcentagem] = useState(0)


    const config = 
    {
        headers:{Authorization: `Bearer ${infoLogin.token}`}
    }
    
    useEffect(() => {

    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
    
    promise
    .then(res=> {
        setMeusHabitosHoje([...res.data]);
        porcentagemConcluida(res.data)
        })
    .catch(err =>  alert("Erro ao carregar habitos de hoje"));

    }, [reload]);

    function marcarDesmarcar(id, done){
        if(!done) {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, config);
            request.then(res => {
                setReload(!reload);

            })
            .catch(() => alert("Erro ao concluir o hábito!"));
        } else {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config);
            request.then(res => {
                setReload(!reload);
            })
            .catch(() => alert("Erro ao desmarcar o hábito!"));
        }
        porcentagemConcluida(meusHabitosHoje)
    }

    function porcentagemConcluida(habitosDoDia) {
        let count = 0;
        habitosDoDia.map(habito => {
            if(habito.done){
                count++;
            }
            return true;});
      
        const valor = habitosDoDia.length === 0 ? 0 : (count/habitosDoDia.length)*100;
        setPorcentagem(valor);
    }
    
    function HabitoHoje({nomeHabito, sequenciaAtual, maiorSequencia, id, done, marcarDesmarcar}){
       return(
        <CheckHabito done={done}>
            <div>
                <h1>{nomeHabito}</h1>
                <p>Sequencia atual: {sequenciaAtual}</p>
                <p>Seu recorde: {maiorSequencia}</p>
            </div>
            <div onClick = {() => marcarDesmarcar(id,done)}><ion-icon name="checkbox"></ion-icon></div>
            
        </CheckHabito>
       )
    }

    function ListaHabHoje({habitosDeHoje}){
        const MontarListaHabitosDeHoje = () =>{
            return habitosDeHoje.map(habito => <HabitoHoje nomeHabito={habito.name} sequenciaAtual={habito.currentSequence} maiorSequencia={habito.highestSequence} id={habito.id} done={habito.done} marcarDesmarcar={marcarDesmarcar}/>);
        }
        const listaHabitosDeHoje = MontarListaHabitosDeHoje();

        return listaHabitosDeHoje;
    }
    return (
        <>  
            <Topo urlImage={infoLogin.image} />
            <ConteudoHoje>
                <div>
                    <h1>{dataHoje.format("dddd")}, {dataHoje.format("DD/MM")}</h1>
                    <p>{porcentagem.toFixed()}% dos hábitos concluídos</p>
                </div>
                    {meusHabitosHoje.length === 0 ?
                    <><p>Voce não tem hábitos hoje!!</p></> 
                    :
                    <ListaHabHoje habitosDeHoje={meusHabitosHoje} />}
            </ConteudoHoje>
            <Menu porcentagem={porcentagem}/>
        </>
    )
}
const ConteudoHoje = styled.div`
    background-color: #F2F2F2;
    width:100%;
    height: 100vh;
    padding-left:18px;
    padding-right:18px;
    padding-top: 98px;
    p{
        
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
       
    }
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        margin-bottom: 17px;

        color: #126BA5;
    }
    `
const CheckHabito = styled.div`
    display:flex;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom:10px;
    
    div:first-child {
        display:flex;
        flex-direction:column;
    
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;

        color: #666666;
    }
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;

        color: #666666;
    }    

    }
    div:nth-child(2){
        display:flex;
        justify-content:flex-end;
    
    ion-icon{
        width: 69px;
        height:69px;
        color: ${props => props.done ? "green" : "#EBEBEB"};
        &:hover{
            cursor: pointer;
        }
    }
    }
    `