import styled from "styled-components"
import {useState} from "react"
import axios from "axios"
import InfoLoginContext from "../contexts/InfoLogin";
import { useContext } from "react";

function Dia({dia, disableButton, diasSelecionados, toggle, id, selecionado}) {
    
    const selecionado = diasSelecionados.some(item => item === id);
    
    return (
       <div disabled={disableButton} onClick={() => toggle({id})}  selecionado={selecionado} toggle={toggle}>
           {dia}
       </div>
    );
}

export default function CriarHabitoPage({setAddHabito}){

    const [novoHabito, setNovoHabito] = useState("")
    const [diasSelecionados, setDiasSelecionados] = useState([])
    const [disableButton,setDisableButton] = useState(false)
    
    const { infoLogin } = useContext(InfoLoginContext);
    const [meusHabitos, setMeusHabitos] = useState([]);

    const diasDaSemana = [{id: 1, dia: "D"}, {id: 2, dia: "S"}, {id: 3, dia: "T"}, 
        {id: 4, dia: "Q"}, {id: 5, dia: "Q"}, {id: 6, dia: "S"}, {id: 7, dia: "S"}];

    function toggle({id}) {
        console.log(`quando clicou o id era: ${id}`)
        const jaSelecionado = diasSelecionados.some(dia => dia === id);
        console.log(jaSelecionado)
    
        if (jaSelecionado === false) {
        setDiasSelecionados([...diasSelecionados,id]);
        console.log("nao estava selecionado", diasSelecionados)
        } else {
        const novosDias = diasSelecionados.filter(itemId => itemId !== id);
        setDiasSelecionados([...novosDias]);
        console.log("estava selecionado", diasSelecionados)
    }
        
    }

    function criarNovoHabito(e) {
        e.preventDefault();
        setDisableButton(true)
        
        if(diasSelecionados.length === 0) {
            alert("Selecione um dia para o este hábito!");
            return;
        }
        const envioHabito = 
        {
            name: novoHabito,
            days: diasSelecionados
        }
        const config = {
            headers: {
                Authorization: `Bearer ${infoLogin.token}`
            }
        }
        function limparFormNovoHabito(){
            setNovoHabito("");
            setDiasSelecionados([]);
        }
    
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", envioHabito, config);
        promise.then(res => {
            setMeusHabitos([...meusHabitos, res.data]);
            limparFormNovoHabito()
            setDisableButton(false);
        });
        promise.catch(res => {
            alert("Erro ao salvar o hábito!");
            setDisableButton(false);
        });
        setAddHabito(false)
    }

    return(
        <ContainerNovoHabito>
            <FormNovoHabito onSubmit={criarNovoHabito}>
                <input type="text" placeholder="nome do hábito" value={novoHabito} onChange={e => setNovoHabito(e.target.value)} required/>
                <Dias>
                    {diasDaSemana.map(dia => <Dia disableButton={disableButton} key={dia.id} id={dia.id} dia={dia.dia} toggle={toggle} diasSelecionados={diasSelecionados}/>)}
                </Dias>
                <CancelarSalvar>
                    <p onClick={() => {setAddHabito(false)}}>Cancelar</p>
                    <button type="submit">Salvar</button>
                </CancelarSalvar>
            </FormNovoHabito >
        </ContainerNovoHabito>
    )
}
const ContainerNovoHabito = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    padding-top:18px;
    width: 340px;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom:29px;

    `
const FormNovoHabito = styled.form`
    input{
        background: ${props => props.disabled ? "grey" : "#ffffff"};
        color: ${props => props.disabled ? "#AFAFAF" : "grey"};
        opacity: 1;
        width: 303px;
        height: 45px;
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
            color: #DBDBDB;}
    }
    `
const Dias = styled.div`
    display: flex;
    
    div{
        display:flex;
        justify-content:center;
        align-items:center;
        width: 30px;
        height: 30px;
        margin-right:4px;
        border-radius: 5px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: ${props => props.selecionado ? "#FFFFFF" : "#DBDBDB"};
        background-color: ${props => props.selecionado ? "#CFCFCF" : "#FFFFFF"};
        border: 1px solid ${props => props.selecionado ? "#CFCFCF" : "#D4D4D4"};
        &:hover{
            cursor: pointer;
        }
    }
    `
const CancelarSalvar = styled.div`
    display:flex;
    align-items:center;
    justify-content: flex-end;
    margin-top: 29px;
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 15.976px;
        line-height: 20px;

        color: #52B6FF;
    }
    button{
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border: none;
    border-radius: 4.63636px;
    text-decoration: none; 
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    margin-left: 18px;
    color: #FFFFFF;
    &:hover{
        cursor:pointer;
    }}`


