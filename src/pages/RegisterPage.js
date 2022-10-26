import { Link } from 'react-router-dom'
import { startRegister } from '../actions/auth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import { Loader } from '../components/Loader';

function RegisterPage ({ history }) {

    const validationSchema = yup.object({
        name: yup
            .string().required("El nombre es requerido"),
        email: yup
            .string()
            .email("Ingresar email valido")
            .required("Email es requerido"),
        password: yup.string().required("Contraseña es requerida"),
    })

    const onSubmit = (values, { setFieldError, setSubmitting }) => {
        const { name, email, password } = values;
        startRegister(name, email, password, setFieldError, setSubmitting, history)
    };

    return (
        <div className="login-form-container">
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {
                    ({ errors, isSubmitting }) =>
                        <Form
                            className="login-form"
                        >
                            <h2 className="login-form-title">
                                Registrarse
                            </h2>

                            <div className="login-form-input">
                                <Field
                                    className={`input-auth ${errors.name ? "validate-input" : ""}`}
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="name" component="div" className="error-input" />
                            </div>


                            <div className="login-form-input">
                                <Field
                                    className={`input-auth ${errors.email ? "validate-input" : ""}`}
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="email" component="div" className="error-input" />


                            </div>

                            <div className="login-form-input">
                                <Field
                                    className={`input-auth ${errors.password ? "validate-input" : ""}`}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="password" component="div" className="error-input" />
                            </div>

                            <div className="link-anchor">
                                <div className="text-right">
                                    <Link to="/login" className="txt1">
                                        Ya tienes cuenta?
                                    </Link>
                                </div>
                            </div>

                            <div className="login-form-button-container">
                                <button
                                    type="submit"
                                    className="login-form-button-container-button"
                                    disabled={isSubmitting}
                                >
                                    Ingresar
                                </button>
                            </div>
                            <Loader loading={isSubmitting} />
                        </Form>
                }
            </Formik>
        </div>
    )
}

export default RegisterPage