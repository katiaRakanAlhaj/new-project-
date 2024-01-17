import { useForm } from "react-hook-form";
import { TUser } from "../../api/auth/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema_signup } from "../schema/shcema";
import { userApi } from "../../api/auth/api";
import TitleWithIcons from "../title-with-icons";
import { useNavigate } from "react-router-dom";
import { Box, Container, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { form } from "../style/style";
import SubmitButtons from "./signupButton";
import GridComponent from "./signupGrid";

interface ISignupSide {}

const SignupInputSide = ({}: ISignupSide) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TUser & { phone?: string; location?: string }>({
    resolver: yupResolver(schema_signup),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      phone: "",
    },
  });
  const navigate = useNavigate();
  const handleFormSubmit = async (
    data: TUser & { phone?: string; location?: string }
  ) => {
    try {
      await userApi.postUsers({ data });
      await userApi.postProfileUsers({
        data: {
          email: data.email,
          location: "syria",
          name: data.name,
          phone: "09000000000",
        },
      });
      navigate("/login");
    } catch (err) {
      console.log("error", err);
    }
  };
  const { t } = useTranslation();

  const inputs = [
    {
      name: "name",
      label: t("Name"),
      error: errors.name,
      errorMassage: errors.name,
    },
    {
      name: "email",
      label: t("Email"),
      error: errors.email,
      errorMassage: errors.email,
    },
    {
      name: "password",
      label: t("Password"),
      error: errors.password,
      errorMassage: errors.password,
    },
    {
      name: "confirmPassword",
      label: t("Confirm Password"),
      error: errors.confirmPassword,
      errorMassage: errors.confirmPassword,
    },
  ];
  const isMobile = useMediaQuery("(max-width:630px)");

  return (
    <Box
      sx={{
        flex: 2,
      }}
    >
      <Container
        sx={[
          form,
          {
            height: isMobile ? "100vh" : "100%",
          },
        ]}
      >
        <TitleWithIcons title={t("Sign in to Account")} />
        <Box
          component="form"
          sx={{ width: isMobile ? "100%" : "50%" }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <GridComponent inputs={inputs} control={control} />

          <SubmitButtons isSubmitting={isSubmitting} />
        </Box>
      </Container>
    </Box>
  );
};
export default SignupInputSide;
