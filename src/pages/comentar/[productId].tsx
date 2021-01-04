import {getAllProducts, findProductById} from "../../libraries/database-admin";
import {Box, Button, FormControl, FormLabel, Textarea, useToast} from "@chakra-ui/react"
import {useForm} from "react-hook-form";
import {useAuth} from "../../libraries/auth";
import {createFeedback} from "../../libraries/database";
import {useRouter} from "next/router";
import {GetStaticPaths, GetStaticProps} from "next";
import {FcGoogle} from 'react-icons/fc'

const Comment = () => {
    const auth = useAuth()
    const router = useRouter()
    const {register, handleSubmit} = useForm();
    const toast = useToast()

    const {productId} = router.query

    const addComment = async (feedback) => {

        if (feedback.comment === " " || !feedback.comment) {
            toast({
                title: "Comentário vazio.",
                description: "Escreva algo na caixa de comentário antes de enviar.",
                status: "error",
                duration: 7000,
                isClosable: true,
            })

            return
        }

        const newFeedback = {
            author: auth.user.displayName,
            authorId: auth.user.uid,
            provider: auth.user.providerData[0].providerId,
            productId,
            rating: 5,
            ...feedback,
            createdAt: new Date().toISOString(),
            status: 'active'
        }

        await createFeedback(newFeedback)

        toast({
            title: "Seu comentário foi enviado!",
            description: "Já estamos cientes da sua opinião, obrigado pela avaliação.",
            status: "success",
            duration: 7000,
            isClosable: true,
        })


        // @ts-ignore
        document.getElementById('comment').value = ''
    }

    return (
        <>
            <Box as={`form`} onSubmit={handleSubmit(addComment)} width={`100%`}
                 marginBottom={5}>
                <FormControl marginY={5}>
                    <FormLabel htmlFor={`comment`} color={`teal.900`}>Deixe o seu comentário</FormLabel>
                    <Textarea
                        id={`comment`}
                        name={`comment`}
                        ref={register({required: 'Required'})}
                        placeholder={`Sugestão, elogio ou reclamação...`}/>
                    {auth.user &&
                    <Button isDisable={router.isFallback} colorScheme={`teal`} marginTop={2} type={`submit`}>Enviar
                        comentário</Button>
                    }
                </FormControl>
            </Box>

            {
                !auth.user &&
                <Button variant="outline" size={`md`} fontWeight={`medium`}
                        colorScheme={"#000"}
                        onClick={auth.signInWithGoogle}
                        margin={3}>
                    <Box as={FcGoogle} size={24} marginRight={2}/>
                    Entre com Google
                </Button>
            }
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {productId} = context.params
    const {product} = await findProductById(productId.toString())

    return {
        props: {
            product
        },
        revalidate: 1
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const {products} = await getAllProducts()
    const paths = products.map(product => ({
        params: {productId: product.id}
    }))

    return {
        paths,
        fallback: true,
    }
}

export default Comment
