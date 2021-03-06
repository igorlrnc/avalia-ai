import {Box, BoxProps, Text, TextProps} from '@chakra-ui/react';

export const Th = (props: TextProps) => (
    <Text
        as="th"
        textTransform="uppercase"
        fontSize="sm"
        color={`teal.800`}
        fontWeight="medium"
        px={4}
        {...props}
    />
);

export const Td = (props: BoxProps) => (
    <Box
        as="td"
        color="gray.900"
        p={4}
        borderBottom="1px solid"
        borderBottomColor="gray.100"
        {...props}
    />
);

export const Tr = (props: BoxProps) => (
    <Box
        as="tr"
        backgroundColor="gray.50"
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        height="40px"
        {...props}
    />
);

export const Table = (props: BoxProps) => {
    return (
        <Box
            as="table"
            textAlign="left"
            backgroundColor="white"
            borderRadius={8}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
            {...props}
        />
    );
};