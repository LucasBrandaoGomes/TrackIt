import styled from "styled-components"

export default function Topo({urlImage}){

    return (
        
            <Top>
                <p>TrackIt</p>
                <img src={urlImage} alt="Foto do perfil"/>
            </Top>
    )
}

const Top = styled.div`
    position:fixed;
    z-index:1;
    top:0;
    left:0;
    display:flex;
    width:375px;
    height:70px;
    padding-left: 18px;
    padding-right:18px;
    justify-content:space-between;
    align-items:center;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    p{
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;

        color: #FFFFFF;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
        object-fit:cover;
    }
`