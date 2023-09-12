// The below import defines which components come from formik
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { signin } from '@/auth/auth'
import { useRouter } from 'next/navigation';

function UploadForm({userId, file}: {userId: string, file: File}) {
    const router = useRouter();
    const submitHandler = async(title: string, price: number) => {
      // const user = await signin(email, password)
      
      router.push(`/user/${userId}`)
    }
  
    return (
      <Formik
      initialValues={{ title: 'title', price: 500, }}
        onSubmit={(values, actions) => submitHandler(values.title, values.price)}
      >
        {(props) => (
          <Form>
            <Field name='email'>
              {({ field, form }:any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>title</FormLabel>
                  <Input {...field} placeholder='title' />
                </FormControl>
              )}
            </Field>
            <Field name='password'>
              {({ field, form }:any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>price</FormLabel>
                  <Input {...field} placeholder='0' />
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