"use client"

import { Button } from "@chakra-ui/react"

const PurchaseButton = (props: {onClick: any}) => {
    const onClick = props.onClick
    return (
        <Button onClick={onClick}>
            購入する
        </Button>
    )
}

export default PurchaseButton