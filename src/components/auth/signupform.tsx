// The below import defines which components come from formik
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

function SignupForm() {
  
    return (
      <Formik
        initialValues={{ username:'', email: '', password:'' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
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