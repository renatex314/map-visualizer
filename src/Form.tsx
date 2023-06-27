import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import styled from "styled-components";
import { useAppDispatch } from "./app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import Location from "./model/Location";
import { addLocation } from "./app/features/locations/locationSlice";
import { useCallback, useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const CardList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

interface FormFields {
    lat: string,
    lng: string,
    text: string
}

const Form = () => {
    const dispatch = useCallback(useAppDispatch(), []);

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = data => {
        const location = new Location(
            parseFloat(data.lat), 
            parseFloat(data.lng), 
            data.text
        );

        dispatch(addLocation(JSON.stringify(location)));
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card title="adicione uma marcação">
                <CardList>
                    <InputText {...register('lat', {required: true})} placeholder='latitude'></InputText>
                    <InputText {...register('lng', {required: true})} name="lng" placeholder='longitude'></InputText>
                    <InputText {...register('text', {required: true})} name="text" placeholder='descrição'></InputText>
                    <Button
                        label="adicionar"
                        type="submit"
                    />
                </CardList>
            </Card>
        </form>
    );
}

export default Form;