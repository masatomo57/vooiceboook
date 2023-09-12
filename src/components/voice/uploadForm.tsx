// The below import defines which components come from formik
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { signin } from '@/auth/auth'
import { useRouter } from 'next/navigation';

function UploadForm() {
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

export default UploadForm