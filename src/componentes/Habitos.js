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
        console.log("meus habitos", meusHabitos)
        });
    }, []);

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
                        <p>{meusHabitos.map(nome => <p>{nome.name}</p>)}</p>
                    </>
                :   
                    
                    <>
                        {meusHabitos.map(item => 
                        <div>
                            <p>{item.name}</p>
                            <DiasDoHabito item={item}/>
                        </div>)}
                    </>
                    
                    }

            </>
            }
            </Container>
            <Menu />
        </>
    )
}
function DiasDoHabito ({item}){
    return item.days.map(diaSemana => <div>{diaSemana}</div>)
}
const Container = styled.div`
    background-color: #F2F2F2;
    width:100%;
    height: 100vh;
    padding-top: 98px;
    padding-left: 18px;
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