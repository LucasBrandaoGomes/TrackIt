import styled from "styled-components"
import {useState} from "react"
import axios from "axios"
import {useEffect} from 'react';
import Topo from "./Topo"
import Menu from "./Menu";
import { useContext } from "react";
import InfoLoginContext from "../contexts/InfoLogin";
import CriarHabitoPage from "./CriarHabitoPage";

export default function Habitos(){

    const [meusHabitos, setMeusHabitos] =useState([]);
    const { infoLogin } = useContext(InfoLoginContext);
    const [addHabito, setAddHabito] = useState(false)


    const config = 
    {
        headers:{Authorization: `Bearer ${infoLogin.token}`}
    }
    
    useEffect(() => {

    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
    
    promise.then(res=> {
        setMeusHabitos([...res.data]);
        });
    }, []);

    function DeletarHabito({id}){

        const config = {
            headers: {
                Authorization: `Bearer ${infoLogin.token}`
            }
        }
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
        promise.then(res => {
            setMeusHabitos(meusHabitos.filter(item => item.id !== id));
        }).catch(() => alert("Erro ao deletar o hábito!"));
    }

    function DiasDoHabito ({item}){
        return item.days.map(diaSemana => <div>{diaSemana}</div>)
    }
    function Habito({id, item, nomeDoHabito}){
        return(
            <HabitoX>
                <h1>{nomeDoHabito}</h1>
                <DiasDoHabito item={item}/>
                <ion-icon name="trash-outline" onClick={() => DeletarHabito({id})}></ion-icon>
            </HabitoX>
        )
    }
    
    return (
        <>  
            <Topo urlImage={infoLogin.image} />
            <Container>
                <MeusHab>
                    <p>Meus hábitos</p>
                    <button onClick={() =>{setAddHabito(true)}}>+</button>
                </MeusHab>
            {meusHabitos.length === 0 ?
                 addHabito ?
                <>
                    <CriarHabitoPage setAddHabito={setAddHabito}/>
                    <SemHabitos>
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    </SemHabitos>
                </>
                :
                    <SemHabitos>
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    </SemHabitos>
            :
            <>
                {addHabito ?
                    <>
                        <CriarHabitoPage setAddHabito={setAddHabito}/>
                        {meusHabitos.map(item => 
                        <Habito id={item.id} item={item} nomeDoHabito={item.name}/>)}
                    </>
                :     
                    <>
                        {meusHabitos.map(item => 
                        <Habito id={item.id} item={item} nomeDoHabito={item.name}/>)}
                    </>
                }
            </>
            }
            </Container>
            <Menu />
        </>
    )
}

const Container = styled.div`
    background-color: #F2F2F2;
    width:100%;
    padding-top: 98px;
    padding-left: 18px;
    margin-bottom: 150px;
`
const MeusHab = styled.div`
    display:flex;
    justify-content: space-between;
    padding-right:18px;
    margin-bottom: 25px;
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;

        color: #126BA5;
    }
    button{
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border:none;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 26.976px;
        line-height: 34px;
        color: #FFFFFF;

        &:hover{
            cursor: pointer;
        }
    }
    `
const SemHabitos = styled.div`
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;

        color: #666666;
    }
    `
const HabitoX = styled.div`
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom:10px;

    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;

        color: #666666;
    }
    ion-icon{
        &:hover{
            cursor: pointer;
        }
    }
    `