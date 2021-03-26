import React from 'react'
import styled from 'styled-components'

const StylePreviewContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    height:100%;
    overflow:hidden
`;

const StylePreviewImage = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
    transition: all .25s ease-in-out;
    &:hover {
        transform:scale(1.2)
    }
`;


export default function StylePreview({ imageUrl, ...rest }) {
    return (
        <StylePreviewContainer {...rest}>
            <StylePreviewImage src={imageUrl} />
        </StylePreviewContainer>
    )
}
