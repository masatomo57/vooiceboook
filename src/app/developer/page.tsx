"use client"
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { signin } from '@/auth/auth'
import { useRouter } from 'next/navigation';
import { v4 as uuidv4, v4 } from "uuid";
import userRepository, { User } from '@/repositories/userRepository';
import { useState } from 'react';
import voiceRepository, { Voice } from '@/repositories/audioRepository';
import bookRepository from '@/repositories/bookRepository';

function SigninForm() {
    const [users, setUsers] = useState<User>()

    const RegistUser = async (username: string, money : number) => {
        const userId = uuidv4()
        const user : User = {
            id : userId,
            name : username,
            money : 10000,
            bookList : {},
            voiceList : [],
            workList : [],
            sampleList : []
        }
        try {
            await userRepository.setUser(user)
            alert("ユーザーを登録しました")
        }
        catch (error) {
            alert("ユーザーの登録に失敗しました")
        }
    }

    const RegistVoice = async (userId:string, bookId:string, voiceName:string, price:number) => {
        const user = await userRepository.getUser(userId)
        if (user === undefined) {
            alert("ユーザーが存在しません")
            return 
        }
        const voiceId = uuidv4()
        const voice: Voice = {
            id: voiceId,
            username : user.name,
            name: voiceName,
            userId: userId,
            bookId: bookId,
            url: "",
            thumbnailUrl: "",
            price: price
        }
        
        const result = voiceRepository.regist(voice);
        
        const workList = user.workList;
        workList.push(voice.id)
        const updatedUser = {
            ...user,
            workList : workList
        }
        await userRepository.setUser(updatedUser)

        const book = await bookRepository.getBook(bookId)
        const voiceList = book.voiceList;
        voiceList.push(voice.id)
        const updatedBook = {
            ...book,
            voiceList : voiceList
        }
        await bookRepository.setBook(updatedBook)
        alert("ボイスの登録が完了しました")
    }
  
    return (
      <div>
        <Formik
        initialValues={{ username: '', money:10000 }}
        onSubmit={(values, actions) => RegistUser(values.username, values.money)}
      >
        {(props) => (
          <Form>
            <Field name='username'>
              {({ field, form }:any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>ユーザー名</FormLabel>
                  <Input {...field} placeholder='username' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='money'>
              {({ field, form }:any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>金額</FormLabel>
                  <Input {...field} placeholder='money' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'
            >
              登録
            </Button>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{ userId: '', bookId:'', voiceName:'',  price:10000 }}
        onSubmit={(values, actions) => RegistVoice(values.userId, values.bookId, values.voiceName, values.price)}
      >
        {(props) => (
          <Form>
            <Field name='userId'>
              {({ field, form }:any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>userId</FormLabel>
                  <Input {...field} placeholder='userId' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='bookId'>
              {({ field, form }:any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>bookId</FormLabel>
                  <Input {...field} placeholder='bookId' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='voiceName'>
              {({ field, form }:any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>ボイス名</FormLabel>
                  <Input {...field} placeholder='voiceName' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='price'>
              {({ field, form }:any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>Price</FormLabel>
                  <Input {...field} placeholder='price' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'
            >
              音声登録
            </Button>
          </Form>
        )}
      </Formik>
      </div>
    )
  }

export default SigninForm