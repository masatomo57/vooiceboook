"use client"

import { Button } from '@chakra-ui/react';
// @ts-ignore
import useSound from 'use-sound'

const PlayVoice = ({ params }: { params: { voiceUrl: string }}) => {
    const [play] = useSound(params.voiceUrl);

    return (
        <>
            <Button onClick={play}>
                サンプル
            </Button>
        </>
    )
}

export default PlayVoice