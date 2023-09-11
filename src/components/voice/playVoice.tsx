"use client"

import useSound from 'use-sound';
import Button from "@chakra-ui/react"

const PlayVoice = ({ params }: { params: { voiceUrl: string }}) => {
    const [play] = useSound(params.voiceUrl);

    return (
        <>
            <Button onClick={() => play()}></Button>
        </>
    )
}

export default PlayVoice