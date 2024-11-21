import React from "react";
import styled from "styled-components";
// Components
import ProjectBox from "../Elements/ProjectBox";
import FullButton from "../Buttons/FullButton";
// Assets
import ProjectImg1 from "../../assets/img/projects/lun1.png";
import ProjectImg2 from "../../assets/img/projects/lun2.png";
import ProjectImg3 from "../../assets/img/projects/lun3.png";
import ProjectImg4 from "../../assets/img/projects/lun4.png";
import ProjectImg5 from "../../assets/img/projects/lun5.png";
import ProjectImg6 from "../../assets/img/projects/lun6.jpg";
import AddImage2 from "../../assets/logo.jpg";
import Demo from "./Demo";
import { Button } from "react-bootstrap";

export default function Projects() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Wrapper id="projects">
       <div className="lightBg">
        <div className="container">
          <Advertising className="flexSpaceCenter">
            <AddLeft>
              <AddLeftInner>
                <ImgWrapper className="flexCenter">
                  <img className="radius8" src={AddImage2} alt="add" />
                </ImgWrapper>
              </AddLeftInner>
            </AddLeft>
            <AddRight>
              <h4 className="font15 semiBold">A propos de nous</h4>
              <h2 className="font40 extraBold">ParLunettes</h2>
              <p className="font12">
               Bienvenue sur ParLunettes, ce site comporte de facilité l'achat des lunettes et leurs accessoires
               pour le client et permet de le payer en ligne et le livraison est gratuit.
              </p>
              <div style={{ width: "190px" }}>
                    <Button onClick={() => setModalShow(true)} style={{background:"#737373",padding:"15px" ,width:"100%",borderRadius:"1rem"}}>Demo</Button>
                    <Demo show={modalShow}
                      onHide={() => setModalShow(false)} />
                  </div>
            </AddRight>
          </Advertising>
        </div>
      </div>
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Nos Produits</h1>
            <p className="font13">
           Voici des exemples de nos produits de notre site.
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg1}
                title="Lunette de vue"
                text="Ces une lunette pour aider les gens a vue,
                leur prix est 150dt."
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg2}
                title="Lunette de vue"
                text="Ces une lunette pour aider les gens a vue,
                leur prix est 200dt."
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg3}
                title="Lunette soleil"
                text="Ces une lunette pour aider les gens a vue dans une soleil,
                leur prix est 250dt."
              />
            </div>
          </div>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg4}
                title="Lunette soleil"
                text="Ces une lunette pour aider les gens a vue dans une soleil,
                leur prix est 300dt."
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg5}
                title="Stérile de lunette"
                text="Elle aide à nettoyer la lunette, leur prix 
                est 50dt."
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg6}
                title="Stérile de lunette"
                text="Elle aide à nettoyer la lunette, leur prix 
                est 50dt."
              />
            </div>
          </div>
          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <FullButton title="Load More" />
            </div>
          </div>
        </div>
      </div>
     
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  padding: 100px 0;
  margin: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;

const AddLeft = styled.div`
  position: relative;
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
  }
`;
const AddLeftInner = styled.div`
  width: 100%;
  position: absolute;
  top: -300px;
  left: 0;
  @media (max-width: 1190px) {
    top: -250px;
  }
  @media (max-width: 920px) {
    top: -200px;
  }
  @media (max-width: 860px) {
    order: 1;
    position: relative;
    top: -60px;
    left: 0;
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  padding: 0 15%;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 400px) {
    padding: 0;
  }
`;
