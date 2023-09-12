// The below import defines which components come from formik
import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { signin } from '@/auth/auth'
import { useRouter } from 'next/navigation';
import { Link } from '@chakra-ui/next-js';

function SigninForm() {
    const router = useRouter();
    const submitHandler = async(email: string, password: string) => {
      const user = await signin(email, password)
      console.log("succeeded to signin!!!!!")
      router.push('/bookList')
    }
  
    return (
      <Formik
        initialValues={{ email: '', password:'' }}
        onSubmit={(values, actions) => submitHandler(values.email, values.password)}
      >
        {(props) => (
          <Form>
            <Container maxW={"4xl"} >
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
                Login
              </Button>
              <Link href={"/signup"}>
                サインアップはこちら
              </Link>
            </Stack>
            </Container>
          </Form>
        )}
      </Formik>
    )
  }

export default SigninForm