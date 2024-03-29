import styled from "styled-components";

export const Box = styled.div`
display: flex;
flex-direction: column;
justify-content: center; 
align-items: center;
`;

export const Div = styled.div`
position: relative;
p {
    position: absolute;
    top: 90%;
    left: 0;
    right: 0;
    margin: auto;
}


.loading {
  filter: blur(20px);
  clip-path: inset(0);
}
.loaded {
  filter: blur(0px);
  transition: filter 1.5s linear;
}


`;

