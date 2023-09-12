// The below import defines which components come from formik
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { signup } from '@/auth/auth';
import { useRouter } from 'next/navigation';

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

            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    )
  }

export default SignupForm