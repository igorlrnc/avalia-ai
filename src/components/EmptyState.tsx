import React from 'react'
import {
    Heading,
    Box,
    Text
} from '@chakra-ui/react'
import AddProductModal from "./AddProductModal";

const EmptyState = () => {
    return (
        <Box
            backgroundColor={`white`}
            display={`flex`}
            flexDirection={`column`}
            justifyContent={`center`}
            alignItems={`center`}
            paddingX={10}
            paddingY={12}
            borderRadius={`md`}
            boxShadow={`md`}
        >
            <Heading size={`lg`} color={`teal.900`}>
                Você ainda não cadastrou nenhum produto.
            </Heading>
            <Text marginTop={4} marginBottom={5} fontSize={`md`} fontWeight={`medium`}>
                Bem-vindo(a) 👋🏾 Vamos começar!
            </Text>
            <AddProductModal isFirstProduct={true}/>
        </Box>
    )
}

export default EmptyState