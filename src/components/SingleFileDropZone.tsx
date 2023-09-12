import { Box, Spacer, Button, VStack } from '@chakra-ui/react';
import { useDropzone, FileWithPath, FileRejection, DropEvent } from 'react-dropzone';

type Props = {
    uploadFile: File|undefined
    onDropFile : (file:File) => void
}

export const SingleFileDropZone= ({uploadFile, onDropFile} : Props) => {
    const maxFiles = 1

    const onDrop = (acceptedFiles: File[]) => {
        const uploadedFiles: FileWithPath[] = acceptedFiles;
        onDropFile(uploadedFiles[0])
    }

    const onDropRejected = (fileRejections: FileRejection[], event: DropEvent) => {
        console.log(`選択できるファイル数は${maxFiles}までです。`)
        for (let file in fileRejections) {
            console.log(`Rejected file : ${file}`)
        }
    }

    const { getRootProps, getInputProps } = useDropzone({ maxFiles, onDrop, onDropRejected });

    return (
        <Box 
            border={'1px dashed'}
            borderColor={'gray.400'}
            borderRadius={'4px'}
            w="100%"
            h={100}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <VStack>
                <Spacer/>
                {uploadFile === undefined ?
                     (<p>ファイルを選択してください</p>) : (<p>{uploadFile.name}</p>)}
                <Spacer/>
                <Button
                    colorScheme='teal'
                >
                    ファイルを選択する
                </Button>
            </VStack>
        </Box>
    )
}