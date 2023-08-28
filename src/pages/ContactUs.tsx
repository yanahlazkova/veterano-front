import Typography from "../components/Typography/Typography.tsx";
import { useMedia } from "../hooks/useMedia.tsx";
import { MdEmail, MdPhone } from "react-icons/md";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input/Input.tsx";
import Textarea from "../components/Textarea/Textarea.tsx";
import Button from "../components/Button/Button.tsx";
import { createFeedback } from "../api/FeedbackAPI.ts";
import { useState } from "react";
import ModalWindow from "../components/Modal/ModalWindow.tsx";
import NavigationLink from "../components/Links/NavigationLink.tsx";
import Section from "../components/Section/Section.tsx";
import Container from "../components/Container/Container.tsx";

const ContactUs = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { isMobile, isTablet, isDesktop } = useMedia();

	const maxMessage = isMobile
		? "Скоротіть текст до 300 знаків"
		: "Просимо скоротити ваше повідомлення до 300 знаків";

	const validationSchema = Yup.object({
		name: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.max(30, "Ім’я повинно бути не більше 30 знаків")
			.required("Заповніть пусте поле"),
		email: Yup.string()
			.email("Введіть дійсний email")
			.test("domain", "Введіть дійсний email", (value) => {
				return !value?.endsWith(".ru") && !value?.endsWith(".by");
			})
			.required("Введіть дійсний email"),
		message: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.max(300, maxMessage)
			.required("Введіть ваше повідомлення"),
	});

	return (
		<>
			<div
				style={{
					backgroundImage: isMobile
						? "url(/images/contact-320w.svg)"
						: isTablet
						? "url(/images/contact-720w.svg)"
						: "url(/images/contact-1440w.svg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<Container
					className={
						"min-w-[230px] h-[240px] lg:h-[290px] flex flex-col justify-end"
					}
				>
					<Typography
						variant={isDesktop ? "h1" : "h2"}
						component={isDesktop ? "h1" : "h2"}
						className={"text-white w-[209px] mb-7 md:w-full "}
					>
						Зв'язатись з нами
					</Typography>
				</Container>
			</div>

			<Section>
				<div className={"contact-info"}>
					<div className={"md:w-[22%] lg:w-[295px]"}>
						<Typography
							variant={isDesktop ? "h4" : "h5"}
							component={isDesktop ? "h4" : "h5"}
						>
							Ми завжди на зв’язку
						</Typography>
					</div>
					<ul className={"text-black text-[18px] leading-7 font-normal"}>
						<li>
							<MdPhone size={24} />
							<p>+38 044 XXX XX XX</p>
						</li>
						<li>
							<MdPhone size={24} />
							<p>+38 044 XXX XX XX</p>
						</li>
						<li>
							<MdEmail size={24} />
							<p>info@baza-trainee.tech</p>
						</li>
					</ul>
				</div>
				<div className={"contact-feedback"}>
					<div className={"md:w-[22%] lg:w-[298px]"}>
						<Typography
							variant={isDesktop ? "h4" : "h5"}
							component={isDesktop ? "h4" : "h5"}
							className={"mt-11"}
						>
							Напишіть нам
						</Typography>
					</div>
					<Formik
						initialValues={{
							name: "",
							email: "",
							message: "",
						}}
						validationSchema={validationSchema}
						onSubmit={async (values, { setSubmitting }) => {
							try {
								const response = await createFeedback({
									name: values.name,
									email: values.email,
									message: values.message,
								});
								if (response) {
									setIsModalOpen(true);
								} else {
									console.log("Помилка від сервера");
								}
							} catch (error) {
								console.log(error);
							} finally {
								setSubmitting(false);
							}
						}}
						validateOnChange={false}
						validateOnBlur={true}
					>
						{({
							values,
							handleBlur,
							handleChange,
							errors,
							touched,
							isValid,
						}) => (
							<Form
								className={
									"md:flex md:w-[55%] md:flex-col lg:w-[55%] lg:flex-row lg:flex-wrap lg:max-w-[800px] "
								}
							>
								<Input
									id={"name"}
									value={values.name}
									error={errors.name && touched.name ? errors.name : undefined}
									name={"name"}
									minLength={2}
									type={"text"}
									label={"Ім'я"}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										"md:w-full md:mr-[20px] lg:flex-grow-0 lg:flex-shrink lg:basis-[305px] "
									}
								/>
								<Input
									id={"email"}
									value={values.email}
									error={
										errors.email && touched.email ? errors.email : undefined
									}
									name={"email"}
									type={"email"}
									label={"Email"}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										"md:w-full lg:flex-grow lg:flex-shrink-0 lg:basis-[413px] "
									}
								/>

								<Textarea
									id={"message"}
									placeholder={"Введіть ваше повідомлення"}
									value={values.message}
									name={"message"}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										errors.message && touched.message
											? errors.message
											: undefined
									}
									className={
										"md:w-full relative mt-[38px] mb-[54px] md:mb-[46px] lg:basis-[785px] lg:flex-grow lg:flex-shrink-0 "
									}
								/>

								<Button
									className={"md:w-[167px]"}
									variant={"primary"}
									disabled={!isValid}
									size={"large"}
									type={"submit"}
								>
									Надіслати
								</Button>
							</Form>
						)}
					</Formik>
					<ModalWindow
						className={
							"p-5 bg-yellow50 w-full md:mt-[10%] md:w-[480px] h-[400px]"
						}
						active={isModalOpen}
						setActive={setIsModalOpen}
					>
						<div className={"text-black mt-[30px]"}>
							<Typography
								variant={"h4"}
								component={"p"}
								className={"text-center font-bold"}
							>
								Ваше повідомлення надіслане
							</Typography>
							<div className={"flex justify-center mt-10"}>
								<img src="/images/success-sent.svg" alt="check" />
							</div>
							<div className={"flex justify-center w-full mt-12"}>
								<NavigationLink to={"/"} variant={"primary"} size={"large"}>
									До головної
								</NavigationLink>
							</div>
						</div>
					</ModalWindow>
				</div>
			</Section>
		</>
	);
};

export default ContactUs;
