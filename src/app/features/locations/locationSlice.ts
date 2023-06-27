import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Location from "../../../model/Location";
import { RootState } from "../../store";

const initialData: string[] = [
    '{"id": 1, "lat": -23.5198616, "lng": -46.1802254, "text": "Escola AstroEduca"}',
    '{"id": 2, "lat": -23.5196895, "lng": -46.1819079, "text": "Mogi das Cruzes"}',
    '{"id": 3, "lat": -19.916256, "lng": -43.936049, "text": "Belo Horizonte"}'
];

interface LocationsState {
    locations: string[];
    selectedLocationIndex: number;
    notificationMessage: string;
}

const initialState: LocationsState = {
    locations: initialData,
    selectedLocationIndex: 0,
    notificationMessage: ''
}

export const locationSlice = createSlice({
    initialState: initialState,
    name: 'locations',
    reducers: {
        addLocation: (state, action: PayloadAction<string>) => {
            const serializedLocation = action.payload;
            state.locations = [...state.locations, serializedLocation];
            state.notificationMessage = 'Marcação adicionada com sucesso !';
        },

        hideNotificationMessage: (state) => {
            state.notificationMessage = '';
        },

        selectLocation: (state, action: PayloadAction<number>) => {
            state.selectedLocationIndex = action.payload;
        },

        removeLocation: (state, action: PayloadAction<number>) => {
            state.locations = state.locations.filter((locationSerialized: string) => {
                const location: Location = new Location(locationSerialized);
                return location.getId() !== action.payload;
            });

            if (state.selectedLocationIndex >= state.locations.length) {
                state.selectedLocationIndex = state.locations.length - 1;
            }

            state.notificationMessage = 'Marcação removida com sucesso !';
        }
    }
});

export const  { addLocation, hideNotificationMessage, selectLocation, removeLocation } = locationSlice.actions;
export const getLocations = (state: RootState) => state.locations.locations.map(
    (locationSerialized: string): Location => new Location(locationSerialized)
);
export const getSelectedLocation = (state: RootState): Location | null => {
    if (state.locations.selectedLocationIndex === -1) {
        return null;
    }

    return new Location(
        state.locations.locations[
            state.locations.selectedLocationIndex
        ]
    );
};
export const getSelectedLocationIndex = (state: RootState): number => state.locations.selectedLocationIndex;
export const isNotificationVisible = (state: RootState): boolean => state.locations.notificationMessage !== '';
export const getNotificationMessage = (state: RootState): string => state.locations.notificationMessage;
export default locationSlice.reducer;