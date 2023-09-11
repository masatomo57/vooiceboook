"use client"

import { Button } from '@chakra-ui/react';
// @ts-ignore
import useSound from 'use-sound'

const PlayVoice = ({ voiceUrl }: { voiceUrl: string }) => {
    const [play] = useSound(voiceUrl);

    return (
        <>
            <Button onClick={play}>
                サンプル
            </Button>
        </>
    )
}

export default PlayVoice