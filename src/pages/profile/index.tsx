import { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  Icon,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  cardInfo,
  container,
  formInput,
  personProfileImage,
  popup,
} from "../../components/style/style";
import {
  IconEmail,
  IconLocation,
  IconPhone,
  IconProfile,
} from "../../icons/icon";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import Modal from "../models/model";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { shawError, shawSuccess } from "../../lib/tosts";
import { theme } from "../../../theme";
import { userProfileApi } from "../../api/profile/api";
import { TProfileUser } from "../../api/profile/interfaces";
import { userQueries } from "../../api/profile/query";

const ProfilePage = ({ themeMode }: { themeMode: string }) => {
  const [otherUser, setUser] = useState<TProfileUser>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [currentModal, setCurrentModal] = useState("");

  const toggleModal = (modal: string) => {
    setCurrentModal(modal);
    setIsModalOpen(!isModalOpen);
  };
  const { data: user } = userQueries.useGetUser(selectedId);

  const { handleSubmit, control, setValue } = useForm<TProfileUser>({
    defaultValues: {
      name: otherUser?.name,
      email: otherUser?.email,
      phone: otherUser?.phone,
      location: otherUser?.location,
    },
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const getUser = async () => {
        const users = await userProfileApi.getUsers();
        const parsedUser = JSON.parse(user);
        const filterUser = users.find(
          (_user) => _user.name === parsedUser.name
        );
        setUser(filterUser);
        setValue("name", filterUser?.name || "");
        setValue("email", filterUser?.email || "");
        setValue("phone", filterUser?.phone || "");
        setValue("location", filterUser?.location || "");
      };
      getUser();
    }
  }, [user, setValue]);

  const { t } = useTranslation();

  const inputs = [
    {
      name: "name",
      label: t("Name"),
    },
  ];

  const inputsTwo = [
    {
      name: "email",
      label: t("Email"),
    },
    {
      name: "phone",
      label: t("Phone"),
    },
    {
      name: "location",
      label: t("location"),
    },
  ];

  const handleUpdate = (modal: string, id?: number) => {
    if (id) {
      setSelectedId(id);
    }
    toggleModal(modal);
  };

  const handleFormSubmit = async (data: TProfileUser) => {
    try {
      const updatedUser = {
        ...otherUser!,
        name: data.name,
      };
      await userProfileApi.updateUser({
        data: data,
        id: otherUser?.id || 0,
      });
      setUser(updatedUser);
      shawSuccess(t("Profile updated successfully"));
    } catch (error) {
      shawError("Error updating profile");
    }
  };

  const handleSubmitFormTwo = async (data: TProfileUser) => {
    try {
      const updatedUser = {
        ...otherUser!,
        email: data.email,
        phone: data.phone,
        location: data.location,
      };
      await userProfileApi.updateUser({
        data: data,
        id: otherUser?.id || 0,
      });
      setUser(updatedUser);
      shawSuccess(t("Profile updated successfully"));
    } catch (error) {
      shawError("Error updating profile");
    }
  };
  const icons = [
    {
      id: "0",
      label: t("Email"),
      icon: <IconEmail />,
      text: <Typography>{otherUser?.email}</Typography>, // Include the otherUser?.name value here
    },
    {
      id: "1",
      label: t("Phone"),
      icon: <IconPhone />,
      text: <Typography>{otherUser?.phone}</Typography>, // Include the otherUser?.name value here
    },
    {
      id: "2",
      label: t("location"),
      icon: <IconLocation />,
      text: <Typography>{otherUser?.location}</Typography>, // Include the otherUser?.name value here
    },
  ];

  const isMobile = useMediaQuery("max-width:900px");
  return (
    <Box
      sx={[container, { minHeight: "100vh", height: "100%" }]}
      style={{
        backgroundColor:
          themeMode === "dark"
            ? theme.palette.primary.dark
            : theme.palette.background.default,
      }}
    >
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "#0F172A",
          height: "25vh",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        <Toolbar></Toolbar>
      </AppBar>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "white",
          height: 400,
          borderBottomRightRadius: "5px",
          borderBottomLeftRadius: "5px",
        }}
        style={{
          backgroundColor:
            themeMode === "dark"
              ? theme.palette.primary.dark
              : theme.palette.background.default,
          border: themeMode === "dark" ? "solid 1px white" : "none",
        }}
      >
        <Toolbar>
          <Avatar src="../images/user-1.ad58ce72.jpg" sx={personProfileImage} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "7rem",
            }}
          >
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: "black" }}
              >
                {otherUser?.name}
              </Typography>
              <Typography sx={{ color: "#475569" }}>
                front end developer
              </Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: "black" }}
              >
                $32,400
              </Typography>
              <Typography sx={{ color: "#475569" }}>
                {t("Total Balance")}
              </Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: "black" }}
              >
                200
              </Typography>
              <Typography sx={{ color: "#475569" }}>
                {t("Board Card")}
              </Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  color:
                    themeMode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                }}
                variant="h6"
                sx={{ color: "black" }}
              >
                3200
              </Typography>
              <Typography sx={{ color: "#475569" }}>
                {t("Calender Events")}
              </Typography>
            </Box>
            <Button onClick={() => handleUpdate("name", otherUser?.id)}>
              <IconProfile />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          <Box
            sx={cardInfo}
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              border: themeMode === "dark" ? "solid 1px white" : "none",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography
                  style={{
                    color:
                      themeMode === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.primary.dark,
                  }}
                  variant="h6"
                >
                  {t("Info")}
                </Typography>
              </Box>
              <Box>
                <Icon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleUpdate("email", otherUser?.id)}
                >
                  <IconProfile />
                </Icon>
              </Box>
            </Box>

            <>
              {icons.map((item) => (
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
                >
                  <Box>
                    <Icon
                      sx={{
                        cursor: "pointer",
                        marginTop: "0.7rem",
                        color:
                          themeMode === "dark"
                            ? theme.palette.primary.light
                            : theme.palette.primary.dark,
                      }}
                      key={item.id}
                    >
                      {item.icon}
                    </Icon>
                  </Box>
                  <Box sx={{ marginTop: "1rem" }}>
                    <Typography color={"#64748B"} key={item.id}>
                      {item.label}
                    </Typography>
                    <Typography color={"#64748B"} key={item.id}>
                      {item.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </>
          </Box>

          <Box sx={{ backgroundColor: "#fff", marginTop: "2rem" }}>
            <Pie
              data={{
                labels: ["Jun", "Jul", "Aug"],
                datasets: [
                  {
                    label: "sadsada",
                    data: [5, 6, 7],
                  },
                  {
                    label: "asdsads",
                    data: [3, 2, 1],
                  },
                ],
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          md={8}
          sm={6}
          xs={12}
          // xs={8}
          container
          sx={{ width: "100%", borderRadius: "5px" }}
        >
          <Box
            sx={{
              // background: "#fff",
              marginTop: "2rem",
              borderRadius: "5px",
              width: "100%",
              height: isMobile ? "fit-content" : "",
            }}
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              border: themeMode === "dark" ? "solid 1px white" : "none",
            }}
          >
            <Bar
              style={{ flex: 1, background: "#fff" }}
              data={{
                labels: ["Jun", "Jul", "Aug"],
                datasets: [
                  {
                    label: "sadsada",
                    data: [5, 6, 7],
                  },
                  {
                    label: "asdsads",
                    data: [3, 2, 1],
                  },
                ],
              }}
            />
          </Box>
          <Box
            sx={{
              marginTop: "2rem",
              borderRadius: "5px",
              width: "100%",
              height: isMobile ? "fit-content" : "",
            }}
            style={{
              backgroundColor:
                themeMode === "dark"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              border: themeMode === "dark" ? "solid 1px white" : "none",
            }}
          >
            <Line
              style={{ flex: 1, background: "#fff" }}
              data={{
                labels: ["Jun", "Jul", "Aug", "sdadsa", "sadsad2", "2aewqe"],
                datasets: [
                  {
                    label: "line1",
                    data: [5, 6, 7, 23, 18, 26],
                  },
                  {
                    label: "line2",
                    data: [3, 2, 1, 41, 5, 12],
                  },
                  {
                    label: "line3",
                    data: [8, 4, 2, 10, 7, 25],
                  },
                  {
                    label: "line4",
                    data: [20, 40, 12, 4, 5, 22],
                  },
                ],
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Modal
        onClose={() => toggleModal("name")}
        openModal={isModalOpen && currentModal === "name"}
      >
        <Box
          component="form"
          sx={popup}
          onSubmit={handleSubmit(handleSubmitFormTwo)}
          style={{
            backgroundColor:
              themeMode === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
            border: themeMode === "dark" ? "solid 1px white" : "none",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
            }}
            style={{
              color:
                themeMode === "dark"
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
            }}
          >
            {t("Update Profile")}
          </Typography>
          <Grid container spacing={2}>
            {inputs.map((input) => (
              <Grid item xs={12} key={input.name}>
                <Controller
                  name={input.name as keyof TProfileUser}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="outlined"
                        sx={formInput}
                        fullWidth
                        label={input.label}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained" size="small">
              {t("Submit")}
            </Button>
            <Button
              onClick={() => toggleModal("name")}
              variant="contained"
              size="small"
            >
              {t("Close")}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        onClose={() => toggleModal("email")}
        openModal={isModalOpen && currentModal === "email"}
      >
        <Box
          component="form"
          sx={popup}
          onSubmit={handleSubmit(handleFormSubmit)}
          style={{
            backgroundColor:
              themeMode === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
            border: themeMode === "dark" ? "solid 1px white" : "none",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
            }}
            style={{
              color:
                themeMode === "dark"
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
            }}
          >
            {t("Update Profile")}
          </Typography>
          <Grid container spacing={2}>
            {inputsTwo.map((input) => (
              <Grid item xs={12} key={input.name}>
                <Controller
                  name={input.name as keyof TProfileUser}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        variant="outlined"
                        sx={formInput}
                        fullWidth
                        label={input.label}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained" size="small">
              {t("Submit")}
            </Button>
            <Button
              onClick={() => toggleModal("email")}
              variant="contained"
              size="small"
            >
              {t("Close")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfilePage;
