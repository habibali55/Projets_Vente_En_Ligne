import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCloudUploadAlt, FaEdit } from 'react-icons/fa';

function EditProduit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Produit, setProduit] = useState({
    Name: '',
    Prix: '',
    Description: '',
    avatar: '',
    Status: ''
  });

  const preset_key = "fh9al9ga";
  const cloud_name = "dxhz5fyrw";

  useEffect(() => {
    const fetchProduitData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/produits/getProduit/${id}`);
        const { Name, Prix, Description, avatar, Status } = response.data;
        setProduit({
          Name: Name || '',
          Prix: Prix || '',
          Description: Description || '',
          avatar: avatar || '',
          Status: Status || ''
        });
      } catch (error) {
        console.error('Error fetching Produit data:', error);
      }
    };

    fetchProduitData();
  }, [id]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", preset_key);
    axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((response) => {
        setProduit(prevProduit => ({
          ...prevProduit,
          avatar: response.data.secure_url
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit({ ...Produit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/produits/EditProduit/${id}`, Produit);
      navigate(-1);
    } catch (error) {
      console.error('Erreur lors de la modification de produit:', error);
    }
  };

  return (
    <Wrapper>
      <Container>
        <HeaderInfo>
          <h1 className="font40 extraBold">Modifier une Produit</h1>
        </HeaderInfo>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <ImageSection>
              <ImageWrapper>
                {Produit.avatar ? (
                  <>
                    <img
                      src={Produit.avatar}
                      alt="Produit"
                      style={{
                        width: '130px',
                        height: '130px',
                        borderRadius: '20%',
                        objectFit: 'cover',
                        border: '1px solid #1F4B43',
                        marginLeft: "10px"
                      }}
                    />
                    <FaEdit
                      size={24}
                      className="edit-icon"
                      onClick={() => document.getElementById('fileUpload').click()}
                    />
                  </>
                ) : (
                  <FaCloudUploadAlt
                    size={30}
                    className='photo-icon'
                    onClick={() => document.getElementById('fileUpload').click()}
                  />
                )}
                <input
                  type="file"
                  id="fileUpload"
                  style={{ display: 'none' }}
                  onChange={handleFile}
                />
              </ImageWrapper>
              <InputWrapper>
                <label className="font13" style={{ marginLeft: "90px", marginTop: "40px" }}>Nom du Produit:</label>
                <input
                  type="text"
                  name="Name"
                  className="font20"
                  style={{ marginLeft: "90px" }}
                  value={Produit.Name}
                  onChange={handleChange}
                />
              </InputWrapper>
            </ImageSection>
            <label className="font13">Prix:</label>
            <input
              type="text"
              name="Prix"
              className="font20"
              value={Produit.Prix}
              onChange={handleChange}
            />
            <label className="font13">Description:</label>
            <textarea
              name="Description"
              className="font20"
              value={Produit.Description}
              onChange={handleChange}
            />
            <label className="font13">Status:</label>
            <input
              type="text"
              name="Status"
              className="font20"
              value={Produit.Status}
              onChange={handleChange}
            />
            <SumbitWrapper>
              <Button variant="primary" type="submit" className="animate radius8" style={{ maxWidth: "220px", backgroundColor: "#737373" }}>
                Modifier
              </Button>
            </SumbitWrapper>
          </Form>
        </FormWrapper>
      </Container>
    </Wrapper>
  );
}

export default EditProduit;

const Wrapper = styled.section`
  width: 100%;
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
`;

const HeaderInfo = styled.div`
  text-align: center;
  padding-bottom: 30px;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
`;

const SumbitWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  margin-right: 20px;

  .photo-icon {
    cursor: pointer;
    position: absolute;
    top: 80%;
    left: 90%;
    font-size: 80px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 5px;
  }

  .edit-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    padding: 5px;
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 30px;

  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 20px;
  }
`;
