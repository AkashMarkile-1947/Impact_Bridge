import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthTemp from './AuthTemp';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Navbar';
/* import { LockClosedIcon } from '@heroicons/react/solid';
 */
/* function AdminLoginForm() {
  return <AuthTemp component={AdminLogin} />
} */

const AdminLoginForm = () => {
  const navigate = useNavigate();

  // Rest of the code...

  return (
    <>
      <Nav /> 
      <div className="signup-page">
        <div className="picture"></div>
        <div className="signup-form">
          <div style={{minWidth: "450px",color: "#d2cfcf"}}>
            <AdminLogin />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginForm;


const AdminLogin = () => {
  const navigate =  useNavigate();
  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password cannot exceed 20 characters')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const {email, password} = values;
    const result = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email,
          password,
      })//
    }).then(res => res.json());

    if(result.status === 'ok') {
      alert('success');
      sessionStorage.setItem('login-data', JSON.stringify(result));
      sessionStorage.setItem('ngo-login', null);
      navigate("../admin-dashboard", {replace: true});
    } else {
      alert('error');
    }
    setSubmitting(false);
  };
  return (
        <>
        <div className="flex flex-col items-center signup-msg min-w-[45%] max-w-[50%] m-auto hidden md:block">
        
          <h2 className="text-lg font-medium text-gray-900">Log in to your account</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8">
              <div className="">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700" style={{backgroundColor: "transparent"}}>
                  Email address
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  style={{backgroundColor: "#fff"}}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mt-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700" style={{backgroundColor: "transparent"}}>
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  style={{backgroundColor: "#fff"}}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex justify-between items-center">
          <Link to="/signup" className="form-links">Don't have an account? Sign Up</Link>
          <Link to="/forgot_password" className="form-links">Forgot password?</Link>
        </div>
        </>
  )
}