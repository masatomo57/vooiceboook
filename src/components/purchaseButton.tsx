import { Button } from "@chakra-ui/react"

const PurchaseButton = (onClick: any) => {
    return (
        <Button type="submit" onClick={onClick}>
            購入する
        </Button>
    )
}

export default PurchaseButton