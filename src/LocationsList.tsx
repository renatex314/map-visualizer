import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  getLocations,
  getSelectedLocationIndex,
  removeLocation,
  selectLocation,
} from "./app/features/locations/locationSlice";
import { useAppDispatch } from "./app/hooks";
import PinIcon from "./assets/marker.png";

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemContainer = styled(ListItemButton)(() => ({
  "& .coords-label": {
    color: "#00000088",
    fontSize: "14px",
  },

  "&.Mui-selected": {
    backgroundColor: "#3d6aff",
    color: "white",

    "& .MuiButtonBase-root": {
      color: "white",
    },

    "& .coords-label": {
      color: "white",
    },

    "&.MuiListItemButton-root:hover": {
      backgroundColor: "#3258d7",
      color: "white",
    },
  },
}));

const CoordsLabel = styled(Typography)(() => ({}));

const LocationsList = () => {
  const locationsList = useSelector(getLocations);
  const selectedLocationIndex = useSelector(getSelectedLocationIndex);
  const dispatch = useAppDispatch();

  const removeLocationHandler = (id: number) => {
    dispatch(removeLocation(id));
  };

  const selectLocationHandler = (index: number) => {
    dispatch(selectLocation(index));
  };

  return (
    <Paper
      sx={{ margin: 0, height: "300px", overflow: "hidden", overflowY: "auto" }}
    >
      <List>
        {locationsList.length === 0 ? (
          <ItemContainer>
            <Typography>Não há marcações cadastradas !</Typography>
          </ItemContainer>
        ) : (
          locationsList.map((location, index) => (
            <ItemContainer
              key={index}
              sx={{ width: "318px", display: "flex" }}
              selected={index === selectedLocationIndex}
            >
              <InfoContainer onClick={() => selectLocationHandler(index)}>
                <Icon
                  src={PinIcon}
                  alt="pin"
                  style={{ objectFit: "contain" }}
                />
                <ListItemText
                  primary={location.getText()}
                  secondary={
                    <CoordsLabel className="coords-label">
                      latitude: {location.getLat()} <br />
                      longitude: {location.getLng()}
                    </CoordsLabel>
                  }
                />
              </InfoContainer>
              <IconButton
                onClick={() => removeLocationHandler(location.getId())}
                sx={{ marginLeft: "auto" }}
              >
                <DeleteIcon />
              </IconButton>
            </ItemContainer>
          ))
        )}
      </List>
    </Paper>
  );
};

export default LocationsList;
