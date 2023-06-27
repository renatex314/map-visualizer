import styled from 'styled-components';
import Map from './Map';
import MarkerImage from './assets/marker.png';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getLocations, getNotificationMessage, hideNotificationMessage, isNotificationVisible } from './app/features/locations/locationSlice';
import Location from './model/Location';
import 'primereact/resources/themes/saga-blue/theme.css';
import Form from './Form';
import LocationsList from './LocationsList';
import { Alert, Snackbar } from '@mui/material';

interface ContainerProps {
  horizontal?: boolean;
  spacing?: number;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: ${props => props.horizontal ? 'row' : 'column'};
  gap: ${props => props.spacing ? props.spacing : 0}px;
  align-items: center;
  justify-content: center;
  background-color: #2c2c2c;
  height: 100vh;
`;

interface PinProps {
  lat: number,
  lng: number,
  text: string
}

const Pin = styled.div<PinProps>`
  cursor: pointer;
  display: inline-block;
  width: 40px;
  height: 40px;
  background-image: url(${MarkerImage});
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50px;
  transform: translate(-50%, -100%);

  &::after {
    content: '${props => props.text}';
    position: absolute;
    top: 100%;
    left: 50%;
    width: max-content;
    color: white;
    transform: translateX(-50%);
    background-color: #33333300;
    border: 1px solid #33333355;
    backdrop-filter: blur(10px);
    padding: 3px 5px;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
  }
`;

function App() {
  const notificationMessage = useAppSelector(getNotificationMessage);
  const notificationVisible = useAppSelector(isNotificationVisible);
  const locations = useAppSelector(getLocations);
  const dispatch = useAppDispatch();

  const hideNotification = () => {
    dispatch(hideNotificationMessage());
  }

  return (
    <Container horizontal spacing={60}>
      <Map
        width={700}
        height={600}
      >
        {locations.map((location: Location) => (
          <Pin
            key={location.getId()}
            lat={location.getLat()}
            lng={location.getLng()}
            text={location.getText()}
          />
        ))}
      </Map>
      <Container horizontal={false} spacing={8}>
        <Form/>
        <LocationsList/>
      </Container>
      <Snackbar
          open={notificationVisible}
          autoHideDuration={6000}
          onClose={hideNotification}
      >
          <Alert
              onClose={hideNotification}
              severity="success"
          >
          {notificationMessage}    
          </Alert>
      </Snackbar>
    </Container>
  )
}

export default App;