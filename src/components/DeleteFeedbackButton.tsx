import React, { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    Button, Box
} from '@chakra-ui/react';


import { deleteFeedback } from '../libraries/database';
import { useAuth } from '../libraries/auth';
import {AiFillDelete} from 'react-icons/ai'

const DeleteFeedbackButton = ({ feedbackId }) => {
    const [isOpen, setIsOpen] = useState<boolean>();
    const cancelRef = useRef();
    const auth = useAuth();

    const onClose = () => setIsOpen(false);
    const onDelete = async () => {
        await deleteFeedback(feedbackId);
        mutate(
            auth.user ? ['/api/feedback', auth.user.ya] : null,
            async (data) => {
                return {
                    feedback: data.feedback.filter(
                        (feedback) => feedback.id !== feedbackId
                    )
                };
            },
            false
        );
        onClose();
    };

    return (
        <>
            <IconButton variant={`ghost`} aria-label="Apagar comentário" icon={<Box as={AiFillDelete} color={`red.600`} size={18}/>} onClick={() => setIsOpen(true)}/>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Remover comentário
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Você tem certeza que deseja remover este comentário?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={onDelete} ml={3}>
                            Remover
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DeleteFeedbackButton;