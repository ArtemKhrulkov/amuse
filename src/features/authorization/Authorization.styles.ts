import styled from 'styled-components';

export const Root = styled.div`
  .root {
    height: 100vh;
  }

  .image {
    background-image: url(https://source.unsplash.com/featured/?music,musician,guitar);
    background-repeat: no-repeat;
    background-color: ${(props) =>
      props.theme.palette.type === 'light'
        ? props.theme.palette.grey[50]
        : props.theme.palette.grey[900]};
    background-size: cover;
    background-position: center;
  }

  .header {
    margin: ${(props) => props.theme.spacing(5)}px;
    color: white;
    text-shadow: 5px 5px 8px #000;
  }
`;

export const SLocalization = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const SPaper = styled.div`
  display: flex;
  margin: ${(props) => props.theme.spacing(8, 4)};
  flex-direction: column;
  align-items: center;

  .avatar {
    margin: ${(props) => props.theme.spacing(1)}px;
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

export const SForm = styled.form`
  width: 100%; /* Fix IE 11 issue. */
  margin-top: ${(props) => props.theme.spacing(1)}px;

  .socials {
    margin: ${(props) => props.theme.spacing(2)}px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button {
    margin: ${(props) => props.theme.spacing(1)}px;
  }
`;
