import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import logoImage from "../assets/Logo.svg";
import { Loader } from "../components/Loader";
import { loginAsync } from "../store/slices/auth.slice";

function LoginPage() {
	const dispatch = useDispatch();

	const validationSchema = yup.object({
		email: yup
			.string()
			.email("Ingresar email valido")
			.required("Email es requerido"),
		password: yup.string().required("Contraseña es requerida"),
	});

	const definirInitialValues = () => {
		const email = localStorage.getItem("email");

		if (email) {
			return {
				email,
				password: "",
				rememberme: true,
			};
		} else {
			return {
				email: "",
				password: "",
				rememberme: false,
			};
		}
	};

	const onSubmit = (values, { setFieldError }) => {
		values.rememberme
			? localStorage.setItem("email", values.email)
			: localStorage.removeItem("email");

		const { email, password } = values;

		return dispatch(loginAsync({ email, password })).catch(({ message }) => {
			setFieldError("email", message);
			setFieldError("password", message);
		});
	};

	return (
		<div className="login-form-container">
			<div className="logo-container">
				<div className="logo-title-container">
					<h1>MessingApp</h1>
					<img alt="messing-app-logo" src={logoImage} />
				</div>
				<h2>Chat your friends in real time!</h2>
			</div>

			<Formik
				initialValues={definirInitialValues()}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
				validateOnChange={false}
				validateOnBlur={false}
			>
				{({ errors, isSubmitting }) => (
					<Form className="login-form">
						<h2 className="login-form-title">Ingresar</h2>

						<div className="login-form-input">
							<Field
								className={`input-auth ${errors.email ? "validate-input" : ""}`}
								type="email"
								name="email"
								placeholder="Email"
								autoComplete="off"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className="error-input"
							/>
						</div>

						<div className="login-form-input">
							<Field
								className={`input-auth ${
									errors.password ? "validate-input" : ""
								}`}
								type="password"
								name="password"
								placeholder="Password"
								autoComplete="off"
							/>
							<ErrorMessage
								name="password"
								component="div"
								className="error-input"
							/>
						</div>

						<div className="login-form-checkbox">
							<Field
								className="input-checkbox"
								type="checkbox"
								name="rememberme"
							/>
							<label className="label-checkbox">Recordarme</label>
						</div>

						<div className="link-anchor">
							<Link to="/register" className="txt1">
								Nueva cuenta?
							</Link>
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
				)}
			</Formik>
		</div>
	);
}

export default LoginPage;
