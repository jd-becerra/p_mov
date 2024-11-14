import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';

const MainContainer = styled(View)`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: black;
`

// Make image occupy the whole width of the screen
const Img = styled(Image)`
    flex: 2;
    aspect-ratio: 1;
    margin: 50px;
`

const TxtContainer = styled(View)`
    flex: 2;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
`

const Txt = styled(Text)`
    font-size: 20px;
    text-align: center;
    color: white;
`

interface ArtistDetailViewProps {
    id: string;
    name: string;
    image: string;
}

const ArtistDetailView: React.FC<ArtistDetailViewProps> = () => {
    const { id, name, image } = useLocalSearchParams();

    console.log('ArtistDetailView', { id, name, image });

    return (
        <MainContainer>
            {typeof image === 'string' && (
                <Img source={{ uri: image }} />
            )}
            <TxtContainer>
                <Txt style={{ fontWeight: 'bold' }}>{name}</Txt>
                <Txt>mbid: {id}</Txt>
            </TxtContainer>
        </MainContainer>
    );
};

export default ArtistDetailView;
