// The below import defines which components come from formik
import { Button, Container, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { signup } from '@/auth/auth';
import { useRouter } from 'next/navigation';
import { Link } from '@chakra-ui/next-js';

function SignupForm() {
  const router = useRouter();
  const onSubmitHandler = async(username:string, email:string, password:string) => {
    try {
      await signup(username, email, password)
      console.log("succeeded to signup!!!!!")
      router.push('/bookList')
    }
    catch {
      alert("サインアップに終了しました")
    }
  }
  
    return (
      <Container maxW={"4xl"} >
        <Formik
        initialValues={{ username:'', email: '', password:'' }}
        onSubmit={(values, actions) => onSubmitHandler(values.username, values.email, values.password)}
      >
        {(props) => (
          <Form>
            <Field name='username'>
              {({ field, form }:any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>username</FormLabel>
                  <Input {...field} placeholder='username' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='email'>
              {({ field, form }:any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>mail_addres</FormLabel>
                  <Input {...field} placeholder='email' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password'>
              {({ field, form }:any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>password</FormLabel>
                  <Input {...field} placeholder='password' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Stack dir='column' align={"center"}>
              <Button
                mt={4}
                colorScheme='teal'
                isLoading={props.isSubmitting}
                type='submit'
                w={"100%"}
              >
                Signup
              </Button>
              <Link href={"/signin"}>
                登録済みの方はこちら
              </Link>
            </Stack>
          </Form>
        )}
      </Formik>
      </Container>
    )
  }

export default SignupForm